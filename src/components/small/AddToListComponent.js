import React, { Component } from 'react';
import { Link } from "react-router-dom";
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux';
import axios from 'axios';
import { rootStyles, baseAPI } from '../../App.js'
// import * as AnimeActions from '../actions/AnimeActions'
import { updateAllAnime, updateAnAnime, saveCurrentAnime, updateExistingAnimeList } from '../../actions/AnimeActions';
import { Image, Container, Col, Row , Carousel } from 'react-bootstrap';
import { Media, Button, Form, FormGroup, Label, Input, FormText } from 'reactstrap';
import { onUpdateModalStatus } from '../../actions/GeneralActions';
import { CREATING_LIST_MODAL_STATUS } from '../../App.js';

import plus_red_icon from '../../img/plus_red.png'
import CheckboxComponent from './CheckboxComponent.js'
import SearchFieldComponent from './SearchFieldComponent.js'


const API = 'http://localhost:5000/anime/';

class AddToListComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      'isListCheckedObj': {}
    }
    if (props.animeLists) {
      for (let i = 0; i < props.animeLists.length; i++) {
        this.state['isListCheckedObj'][i] = false;
      }
    }

    this.loadLists = this.loadLists.bind(this);
    this.loadButton = this.loadButton.bind(this);
    this.addToList = this.addToList.bind(this);
  }

  createNewListWithAnime() {
    // Update modal status to create list screen
    // Hopefully HomePageComponent still has current anime
    // toggleSearch(e) {
    //   //console.log('Toggle search occurred')
    //   if (e) {
    //     e.stopPropagation();
    //     e.nativeEvent.stopImmediatePropagation();
    //     e.preventDefault()
    //   }
    //   this.props.history.push('/search')
    //   this.props.updateModalStatus(SEARCHING_MODAL_STATUS)
    // }
  }

  loadLists() {
    if (this.props.animeLists && this.props.animeLists.length > 0)  {
      return this.props.animeLists.map((animeObj, index) => {
        return (
          <Col sm={6} md={4} lg={4} xl={4} style={{"margin-bottom": "25px", 'margin-right': "0px"}}>
            <Row>
              <Col md={2} style={{'margin': "0px",}}>
                <CheckboxComponent id={index} style={{'padding-top': '10px', 'padding-right': '10px'}} onClick={
                    (id, value) => {
                      let obj = {};
                      obj[id] = value
                      this.setState({...this.state, 'isListCheckedObj': {...this.state.isListCheckedObj, ...obj}});
                    }
                  }
                  />
              </Col>
              <Col sm={10}>
                <label for="checkbox" style={{'font-size': "1.7em", 'color': '#5a6674'}}><b>{animeObj['animeListName']}</b></label>
              </Col>
            </Row>
          </Col>
        );
      });
    } else {
      let htmlArr = [];
      const fakeLists = ['Shonen List', 'Psychological Thriller List', 'Slice of Life List', 'Otaku List', 'Classics List', 'Weird List'];
      htmlArr.push(
        <Row style={{"justify-content": "center", "align-items": "center", 'width': '100vw', 'font-size': '1.2em', 'font-weight': 'bold', 'margin': '25px'}}>
          These are examples, you haven't made a list yet! Click the red button below 😉
        </Row>
      );
      for (let i = 0; i < fakeLists.length; i++) {
          htmlArr.push(
            <Col sm={6} md={4} lg={4} xl={4} style={{"margin-bottom": "25px", 'margin-right': "0px"}}>
              <Row>
                <Col md={2} style={{'margin': "0px",}}>
                  <CheckboxComponent id={i} style={{'padding-top': '10px', 'padding-right': '10px'}}/>
                </Col>
                <Col sm={10}>
                  <label for="checkbox" style={{'font-size': "1.7em", 'color': '#5a6674'}}><b>{fakeLists[i]}</b></label>
                </Col>
              </Row>
            </Col>
          )
      }
      return htmlArr;
    }
  }

  addToList() {
    let listIdsToUpdate = [];
    for (let i  = 0; i < this.props.animeLists.length; i++) {
      if (this.state['isListCheckedObj'][i]) {
        listIdsToUpdate.push(this.props.animeLists[i]['_id'])
      }
    }
    //console.log('AddToListComponent state:', this.state)
    //console.log('AddToListComponent listIdsToUpdate:', listIdsToUpdate)
    if (listIdsToUpdate.length == 0) return;
    axios.patch(baseAPI + '/update/user/anime/list', {
      'listIDs': listIdsToUpdate,
      'animeIDs': [this.props.currentAnime.id]
    }).then((response) => {
      const data = response.data;
      //console.log("Updated list response data:", data);
      data.forEach((animeList) => {
        this.props.updateExistingAnimeList(data);
      });
      this.props.setIsLoading(false, true);
    }).catch((err) => {
      //console.log('Err when updating list in server', err);
    });
    this.props.setIsLoading(true, false);
  }

  loadButton() {
    if (this.props.animeLists && this.props.animeLists.length > 0)  {
      return (
        <Button style={{'background-color': rootStyles['secondaryColorRed'], color: "white"}} onClick={this.addToList}>
          Add to List
        </Button>
      );
    } else {
      return (
        <Button
          onClick={(e) => {this.props.onUpdateModalStatus(CREATING_LIST_MODAL_STATUS)} }
          style={{'background-color': rootStyles['secondaryColorRed'], color: "white"}}>
          Create List
        </Button>
      );
    }
  }

  render() {
    return (
      <div>
        <Row>
          {this.loadLists()}
        </Row>
        <Row style={{"justify-content": "center", "align-items": "center", 'margin-top': '-10px', 'margin-bottom': '20px'}}>
          {this.loadButton()}
        </Row>
      </div>
    );
  }
}


// Use selectors here
const mapStateToProps = (state) => {
  // //console.log("mapStateToProps: This is current state in AnimeDescriptionComponent: ", state)
  return {
  }
}

export default connect(mapStateToProps, {
  updateExistingAnimeList,
  onUpdateModalStatus,
})(AddToListComponent);
