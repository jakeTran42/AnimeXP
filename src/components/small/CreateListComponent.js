import React, { Component } from 'react';
import { Link } from "react-router-dom";
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux';
// import * as AnimeActions from '../actions/AnimeActions'
import { updateAllAnime, updateAnAnime, saveCurrentAnime } from '../../actions/AnimeActions';
import { Image, Container, Col, Row , Carousel, Form, } from 'react-bootstrap';
import { Button } from 'reactstrap';
import YouTube from 'react-youtube';

import { rootStyles, baseAPI } from '../../App.js'
import AddToListComponent from './AddToListComponent';
import AnimeCardComponent from './AnimeCardComponent';

import plus_red_icon from '../../img/plus_red.png'
import galaxy_background from '../../img/galaxy.jpeg'
import fma_transmutation_circle from '../../img/fma_transmutation_circle.png'
import cute_girl from '../../img/cute_girl_anime.png'



const API = 'http://localhost:5000/anime/';

class CreateListComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      'listName': '',
      'listDescription': '',
      'addingToList': false,
      'hasListName': true
    }
    this.submitList = this.submitList.bind(this)
    this.updateState = this.updateState.bind(this)
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
    if (this.props.currentAnime) {
      this.props.createList(e, this.state.listName, this.state.listDescription, this.props.currentAnime.id)
    } else {
      this.props.createList(e, this.state.listName, this.state.listDescription, undefined)
    }


  }

  updateState(e) {
    // //console.log("This is target id:", e.target.id)
    // //console.log("This is value:", e.target.value)
    let field = e.target.id
    let value = e.target.value
    switch(field) {
      case('formListName'):
        this.setState({...this.state, 'listName': value})
        break
      case('formListDescription'):
        this.setState({...this.state, 'listDescription': value})
        break
    }

  }

  render() {
    return (
      <div>
        <div style={{'-webkit-overflow-scrolling': 'touch'}}>
          <Container>
            <Row style={{"justify-content": "center", "align-items": "center"}}>
              <Image src={cute_girl} style={{'min-width': '175px','width': '40%', 'min-height': '200px', 'borderRadius': '25px'}}/>
            </Row>

            {/*SECTION: Anime Title*/}
            <Row style={{"justify-content": "center", "align-items": "center", 'paddingBottom': '20px'}}>
              <div style={{'color': 'black', 'font-size': '2em', 'font-weight': 'bold'}}>Create A New List</div>
            </Row>

            {/*SECTION: Anime Description*/}
            <Row style={{"justify-content": "center", "align-items": "center", 'paddingBottom': '20px'}}>
              <Form>
                <Form.Group controlId="formListName">
                  <Form.Label>Name</Form.Label>
                  <Form.Control required size="md" type="text" placeholder="Inspirational Anime" value={this.state.listName} onChange={this.updateState} />
                  <Form.Text className="text-muted">
                    The name you and your friends will see when looking at this list...
                  </Form.Text>
                </Form.Group>

                <Form.Group controlId="formListDescription">
                  <Form.Label>Description</Form.Label>
                  <Form.Control value={this.state.listDescription} onChange={this.updateState} as="textarea" rows="5" size='sm' placeholder="This is my list of anime that make me want to be the greatest! (Think: Naruto, Black Clover, Bleach, etc...)"/>
                  <Form.Text className="text-muted">
                    Give a cool short description so when they're looking at this, they're not like 'wtf?'
                  </Form.Text>
                </Form.Group>
                <Row style={{"justify-content": "center", "align-items": "center", 'paddingBottom': '5px'}}>
                  <span style={{'color': 'red', 'visibility': this.state.hasListName ? "hidden" : "visible"}}>Please add a list name</span>
                </Row>
              <Row style={{"justify-content": "center", "align-items": "center", 'paddingBottom': '20px'}}>
                  <Button onClick={this.submitList} style={{'background-color': rootStyles['secondaryColorRed'], color: "white"}} variant="primary" type="submit">
                    Submit
                  </Button>
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
export default CreateListComponent;
