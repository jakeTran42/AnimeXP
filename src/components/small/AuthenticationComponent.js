import React, { Component } from 'react';
import { Link } from "react-router-dom";
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux';
import ReactGA from 'react-ga';

// import * as AnimeActions from '../actions/AnimeActions'
import { updateAllAnime, updateAnAnime, saveCurrentAnime } from '../../actions/AnimeActions';
import { Image, Container, Col, Row , Carousel, } from 'react-bootstrap';
import { Button, Form, FormGroup, Label, Input, FormText } from 'reactstrap';
import YouTube from 'react-youtube';
import * as EmailValidator from 'email-validator';

import { rootStyles, baseAPI, IS_AUTHENTICATED } from '../../App.js'
import AddToListComponent from './AddToListComponent';
import AnimeCardComponent from './AnimeCardComponent';
import axios from 'axios';

import plus_red_icon from '../../img/plus_red.png'
import galaxy_background from '../../img/galaxy.jpeg'
import fma_transmutation_circle from '../../img/fma_transmutation_circle.png'
import fma_chibi from '../../img/fma_chibi.png'




class AuthenticationComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      'email': '',
      'password': '',
      'hasError': false,
      'error': ''
    }

    this.loadButtons = this.loadButtons.bind(this)
    this.getTitle = this.getTitle.bind(this)
    this.authenticate = this.authenticate.bind(this)
  }

  getTitle(mainTitle) {
    if (!this.props.authAction) {
     //console.log('this.props.authAction:', this.props.authAction)
      return;
    }

    if (mainTitle) {
      return this.props.authAction == '/login' ? 'お帰りなさい' : '体験に参加する';
    } else {
      const loginText = (
        <div style={{'width': '100%'}}>
          Welcome Back <span style={{"font-size": "0.6em"}}>(sub)</span>
        </div>
      )
      const registerText = (
        <div style={{'width': '100%'}}>
          Join The Experience <span style={{"font-size": "0.6em"}}>(sub)</span>
        </div>
      )
      return this.props.authAction == '/login' ? loginText : registerText;
    }

  }

  submitList(e) {
    if (e) {
      e.stopPropagation();
      e.nativeEvent.stopImmediatePropagation();
      e.preventDefault()
    }
    if (!this.state.listName || this.state.listName.replace(' ', '') == '') {
      this.setState({...this.state, 'hasListName': false})
     //console.log('submitlist without name attempted')
      return;
    }
    // if (this.props.currentAnime) {
    //   this.props.createList(e, this.state.listName, this.state.listDescription, this.props.currentAnime.id)
    // } else {
    //   this.props.createList(e, this.state.listName, this.state.listDescription, undefined)
    // }


  }

  loadButtons() {
    if (this.props.authAction == '/register') {
      return (
        <div>
          <Button onClick={(e) => {this.authenticate(e, false)}} style={{'background-color': rootStyles['secondaryColorRed'], color: "white"}} variant="primary" type="submit">
            Signup
          </Button>
          <a href="/login" style={{'margin-left': '20px', 'color': rootStyles['mainColorRed'], 'font-size': '1.2em'}}>Login</a>
        </div>
      );
    } else {
      return (
        <div>
          <Button onClick={(e) => {this.authenticate(e, true)}} style={{'background-color': rootStyles['secondaryColorRed'], color: "white"}} variant="primary" type="submit">
            Login
          </Button>
          <a href="/register" style={{'margin-left': '20px', 'color': rootStyles['mainColorRed'], 'font-size': '1.2em'}}>Signup</a>
        </div>
      );
    }
  }

  authenticate(e, isLogin) {
    if (e) {
      e.stopPropagation();
      e.nativeEvent.stopImmediatePropagation();
      e.preventDefault()
    }
    if (!this.state.email || !EmailValidator.validate(this.state.email)) {
      const error = `${this.state.email} is not a valid email`
      this.setState({...this.state, 'hasError': true, 'error': error});
      return;
    }

    if (!this.state.password || this.state.password.length < 8) {
      const error = `Your password needs to be at least 8 characters`
      this.setState({...this.state, 'hasError': true, 'error': error});
      return;
    }

    const URL = baseAPI + (isLogin ? '/api/user/login/v0' : '/api/user/signup/v0');
    let variables = {
      'email': this.state.email,
      'password': this.state.password,
      'userID': isLogin ? undefined : this.props.cookies.get('userId')
    }
    this.props.setIsLoading(true, false);
   //console.log("About to make call:", variables)
    axios.post(URL, variables).then((response) => {
      const data = response.data;
      if (!isLogin) {
        if (data.UserId) {
          this.props.cookies.set('userId', data.UserId);
          ReactGA.set({ userId: data.UserId });
        }
        this.props.cookies.set('registered', data.Register);
      } else {
        this.props.cookies.set('userId', data['userId']);
        this.props.cookies.set('registered', true);
        this.props.saveAllAnimeLists(data['userAnimeList'])
      }
      this.props.updateAuthStatus(IS_AUTHENTICATED)
      this.props.toggleAuth(true);
      // this.props.setIsLoading(false, true);
    }).catch((err) => {
     //console.log('Error occured during authentication:', err)
      let error = ''
      if (err.response) {
        switch (err.response.status) {
          case (400):
            error = (
              isLogin ?
                'There was an issue with the email/password combination!':
                'Seems like you have already registered!'


            )
            break;

          case (401):
            error = "Invalid input!"
            break;

          case (402):
            error = "User not registered!"
            break

          default:
            error = "Sorry, we faced an unexpected error..."
            break;
        }
        this.setState({...this.state, 'hasError': true, 'error': error});
      } else {
        const error = "Sorry, we faced an unexpected error..."
        this.setState({...this.state, 'hasError': true, 'error': error});
      }
      this.props.setIsLoading(false, false);

    });

  }

  render() {
   //console.log('AuthenticationComponent state:', this.state);
    return (
      <div>
        <div style={{'-webkit-overflow-scrolling': 'touch'}}>
          <Container>
            <Row style={{"justify-content": "center", "align-items": "center"}}>
              <Image src={fma_chibi} style={{'min-width': '175px','width': '30%', 'min-height': '200px', 'borderRadius': '25px'}}/>
            </Row>

            {/*SECTION: Title*/}
            <Row style={{"justify-content": "center", "align-items": "center",}}>
              <div style={{'color': 'black', 'font-size': '2em', 'font-weight': 'bold'}}>{this.getTitle(true)}</div>
            </Row>
            <Row style={{"justify-content": "center", "align-items": "center", 'paddingBottom': '20px'}}>
              <div style={{ 'font-size': '1.7em', 'font-weight': 'bold', 'width': '100%', 'text-align': 'center'}}>{this.getTitle(false)}</div>
            </Row>

            {/*SECTION: Form fields*/}
            <Row style={{"justify-content": "center", "align-items": "center", 'paddingBottom': '20px'}}>
              <Form style={{'width': '30vw', 'maxWidth': '790px'}}>
                <FormGroup>
                  <Label for="emailField">Email</Label>
                  <Input type="email" name="email" id="emailField" placeholder="Enter your email here..."
                  value={this.state.email} onChange={(e) => {this.setState({...this.state, email: e.target.value})}}
                   />
                </FormGroup>

                <FormGroup>
                  <Label for="examplePassword">Password</Label>
                  <Input type="password" name="password" id="examplePassword" placeholder="Enter password here..."
                  value={this.state.password} onChange={(e) => {this.setState({...this.state, password: e.target.value})}}
                  />
                </FormGroup>

                <Row style={{"justify-content": "center", "align-items": "center", 'paddingBottom': '5px'}}>
                  <span style={{'color': 'red', 'visibility': this.state.hasError ? "visible" : "hidden"}}>{this.state.error}</span>
                </Row>
                <Row style={{"justify-content": "center", "align-items": "center", 'paddingBottom': '20px'}}>
                  {this.loadButtons()}
                </Row>
              </Form>
            </Row>
          </Container>
        </div>
      </div>
    );
  }
}


// Use selectors here
const mapStateToProps = (state) => {
  //console.log("mapStateToProps: This is current state in AnimeDescriptionComponent: ", state)
  return {
    anime: state.anime.currentAnime
  }
}
// const mapDispatchToProps = (dispatch) => {
//   return bindActionCreators(AnimeActions, dispatch);
// }
const mapActionsToProps = {
  onUpdateAnime: updateAllAnime,
  onUpdateAnAnime: updateAnAnime,
  onSaveCurrentAnime: saveCurrentAnime
}
export default AuthenticationComponent;
