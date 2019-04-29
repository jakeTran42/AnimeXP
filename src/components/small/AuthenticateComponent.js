import React, { Component } from 'react';
import { Link } from "react-router-dom";
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux';
// import * as AnimeActions from '../actions/AnimeActions'
import { updateAllAnime, updateAnAnime, saveCurrentAnime } from '../../actions/AnimeActions';
import { Image, Container, Col, Row , Carousel, Form } from 'react-bootstrap';
import { Button } from 'reactstrap';
import YouTube from 'react-youtube';

import AddToListComponent from './AddToListComponent';
import AnimeCardComponent from './AnimeCardComponent';

import plus_red_icon from '../../img/plus_red.png'
import galaxy_background from '../../img/galaxy.jpeg'
import fma_transmutation_circle from '../../img/fma_transmutation_circle_red.png'



const API = 'http://localhost:5000/anime/';

class CreateListComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      'addingToList': false
    }
    // //console.log("Anime Description Component Called")
    // this.state = {
    //   'isAnimeDescriptionOpen': false
    // }
    // this.onUpdateAnime = this.onUpdateAnime.bind(this);
    // this.loadAnime = this.loadAnime.bind(this)
    // this.fetchAnime = this.fetchAnime.bind(this)
    this.getAnimeInfo = this.getAnimeInfo.bind(this)
    this.setupTopSection =  this.setupTopSection.bind(this)
    this.toggleAddToList = this.toggleAddToList.bind(this)
  }

  getAnimeInfo(info) {
    if (!this.props.currentAnime) return null

    switch(info) {
      case 'background-image':
        if (this.props.currentAnime.coverImage) {
          return this.props.currentAnime.coverImage
        } else {
          return galaxy_background
        }
      case 'poster-image':
        if (this.props.currentAnime.posterImage) {
          return this.props.currentAnime.posterImage
        } else {
          return null
        }
      case 'title':
        if (this.props.currentAnime.title) {
          return this.props.currentAnime.title
        } else {
          return null
        }
      case 'description':
        if (this.props.currentAnime.description) {
          return this.props.currentAnime.description
        } else {
          return null
        }
      case 'youtube-id':
        if (this.props.currentAnime.youtubeTrailerId) {
          return this.props.currentAnime.youtubeTrailerId
        } else {
          return null
        }

    }
  }

  setupTopSection() {
    if (this.state.addingToList) {
      return (<div>

        <AddToListComponent />
        <Row style={{"justify-content": "center", "align-items": "center"}}>
          <AnimeCardComponent  src={this.getAnimeInfo('poster-image')}/>
          {/*div style={{'width': '150px', 'height': '200px', 'background-color': 'black'}}></div>*/}
        </Row>
      </div>);
    } else {
      return (<div>
        {/*SECTION: Banner Image*/}
        <Row>
          {/*If image is null then remove this section*/}
          <Image style={{'width': '100%', 'height': '300px', 'borderRadius': '25px'}} src={this.getAnimeInfo('background-image')}></Image>
          <div style={{'width': '100%', 'height': '300px', 'background-color': "rgba(0,0,0,0.5)", 'margin-top': '-300px', 'borderRadius': '25px'}} />
          <Image src={plus_red_icon} style={
              {"max-height": "4vh", 'min-height': "35px", 'vertical-align': 'middle', 'margin-top': '-290px', 'padding-left': '10px'}
            }
            onClick={this.toggleAddToList}
          />
        </Row>

        {/*SECTION: Post Image*/}
        <Row style={{"justify-content": "center", "align-items": "center", 'margin-top': '-40px'}}>
          <AnimeCardComponent  src={this.getAnimeInfo('poster-image')}/>
        </Row>
      </div>);
    }
  }

  toggleAddToList() {
    this.setState({'addingToList': !this.state.addingToList})
  }



  onYouTubeReady(event) {
    // access to player in all event handlers via event.target
    event.target.pauseVideo();
  }
  render() {
    return (
      <div>
        <div style={{}}>
          <Container>
            <Row style={{"justify-content": "center", "align-items": "center"}}>
              <Image src={fma_transmutation_circle} style={{'width': '40%', 'height': '300px', 'borderRadius': '25px'}}/>
            </Row>

            {/*SECTION: Anime Title*/}
            <Row style={{"justify-content": "center", "align-items": "center", 'paddingBottom': '20px'}}>
              <div style={{'color': 'black', 'font-size': '2em'}}><b>Create A New List</b></div>
            </Row>

            {/*SECTION: Anime Description*/}
            <Row style={{"justify-content": "center", "align-items": "center", 'paddingBottom': '20px'}}>
              <Form>
                <Form.Group controlId="formBasicEmail">
                  <Form.Label>Email address</Form.Label>
                  <Form.Control type="email" placeholder="Enter email" />
                  <Form.Text className="text-muted">
                    We'll never share your email with anyone else.
                  </Form.Text>
                </Form.Group>

                <Form.Group controlId="formBasicPassword">
                  <Form.Label>Password</Form.Label>
                  <Form.Control type="password" placeholder="Password" />
                </Form.Group>
                <Form.Group controlId="formBasicChecbox">
                  <Form.Check type="checkbox" label="Check me out" />
                </Form.Group>
                <Button variant="primary" type="submit">
                  Submit
                </Button>
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
export default CreateListComponent;
