import React, { Component } from 'react';
import '../../css/search-bar.css'
import { Link } from "react-router-dom";
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux';
import { rootStyles, baseAPI } from '../../App.js'
// import * as AnimeActions from '../actions/AnimeActions'
import { updateAllAnime, updateAnAnime, saveCurrentAnime } from '../../actions/AnimeActions';
import { Image, Container, Col, Row , Carousel } from 'react-bootstrap';
import { Media, Button, Form, FormGroup, Label, Input, FormText } from 'reactstrap';
import { Collapse, Navbar, NavbarToggler, NavbarBrand, Nav, NavItem, NavLink } from 'reactstrap';
import axios from 'axios';

import number_1 from '../../img/numbers/number_1.png'
import number_2 from '../../img/numbers/number_2.png'
import number_3 from '../../img/numbers/number_3.png'
import number_4 from '../../img/numbers/number_4.png'
import number_5 from '../../img/numbers/number_5.png'
import number_6 from '../../img/numbers/number_6.png'
import chibi_group from '../../img/chibi_group.png'
import plus_red_icon from '../../img/plus_red.png'
import chibi_goku_god from '../../img/chibi_goku_god.png'
import chibi_naruto from '../../img/chibi_naruto.png'
import chibi_ash from '../../img/chibi_ash.png'
import chibi_joey_wheeler from '../../img/chibi_joey_wheeler.gif'
import create_list_button_image from '../../img/create_list_button.png'
import submit_button_image from '../../img/submit_button.png'

import CheckboxComponent from './CheckboxComponent.js'
import SearchFieldComponent from './SearchFieldComponent'




class WelcomeComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
    }
    // //console.log("Anime Description Component Called")
    // this.state = {
    //   'isAnimeDescriptionOpen': false
    // }
    // this.onUpdateAnime = this.onUpdateAnime.bind(this);
    // this.loadAnime = this.loadAnime.bind(this)
    // this.fetchAnime = this.fetchAnime.bind(this)
    this.searchForAnime = this.searchForAnime.bind(this);
    this.loadSearchResults = this.loadSearchResults.bind(this);
    this.loadChibiCharacter = this.loadChibiCharacter.bind(this);
  }

  loadChibiCharacter() {
    const selection = [chibi_goku_god, chibi_naruto, chibi_ash, chibi_joey_wheeler]
    return selection[Math.floor(Math.random() * selection.length)]
  }

  searchForAnime(e, text) {
    //console.log('This was the target:', e ? e.target : 'null')
    e.preventDefault()
    this.props.cookies.set('welcomeScreenShown', true);
    this.props.openSearchWithText(text)
  }

  loadSearchResults() {
    let results = [];
    if (!this.state.animes) {
      const names = ['Tokyo Ghoul', 'Boruto: Naruto The Next Generation', 'Attack on Titan (Season 2)']
      const ids = [22319, 34566, 25777]
      for (let i = 0; i < names.length; i++) {
        results.push(
          <a href={'/anime/' + ids[i]} onClick={(e) => this.props.setCurrentAnime(e, true, ids[i])} style={{'width': '100%', 'font-size': '1.5em', 'color': 'white', 'margin-bottom': '15px'}}>{names[i]}</a>
        );
      }
    } else {
      results = this.state.animes.map((anime, index) => {
        return(
          <a href={'/anime/' + anime['id']} onClick={(e) => this.props.setCurrentAnime(e, true, anime['id'])} style={{'width': '100%', 'font-size': '1.5em', 'color': 'white', 'margin-bottom': '15px'}}>
            <Container>
              <Col sm={3}><Image src={anime['posterImage']} style={{'height': '150px', 'width': '125px'}}/></Col>
              <Col sm={8}><span href="#" style={{'font-size': '1.2em', 'color': 'white', 'margin-bottom': '15px'}}>{anime['title']}</span></Col>
            </Container>
          </a>
        );
      });
    }
    return results
  }

  getInstructionsText(text) {
    let instructionsNumbering = [
      number_1,
      number_2,
      number_3,
      number_4,
      number_5,
      number_6
    ];
    let instructionsList = [
      'Search for an anime you like and click it',
      'Click the red "+" at the top left',
      'Click the red create new list button',
      'Give your list a name then click create a new list button',
      'See the top recommended anime for you at the bottom of your home page based off your new anime list',
      'Add more anime to your new list to make it more personalized, make new lists, or checkout the episodes for your anime recommendations!'
    ]
    return instructionsList.map((instruction, index) => {
      let text = undefined
      if (instruction.includes('red "+"')) {
        let instructionParts = instruction.split('red "+"');
        text = (
          <span style={{'width': '100%'}}>
            {instructionParts[0]}
            <Image src={plus_red_icon} style={
                {"height": "20px",'vertical-align': 'middle', 'padding-left': '5px', 'padding-right': '5px'}
              }
            />
            {instructionParts[1]}
          </span>
        );
      } else if (instruction.includes('red create new list')) {
        let instructionParts = instruction.split('red create new list');
        text = (
          <span style={{'width': '100%'}}>
            {instructionParts[0]}
            <Image src={create_list_button_image} style={
                {"height": "20px",'vertical-align': 'middle', 'padding-left': '5px', 'padding-right': '5px'}
              }
            />
            {instructionParts[1]}
          </span>
        );
      } else if (instruction.includes('create a new list')) {
        let instructionParts = instruction.split('create a new list');
        text = (
          <span style={{'width': '100%'}}>
            {instructionParts[0]}
            <Image src={submit_button_image} style={
                {"height": "20px",'vertical-align': 'middle', 'padding-left': '5px', 'padding-right': '5px'}
              }
            />
            {instructionParts[1]}
          </span>
        );
      } else if (index == 4) {
        text = (<span style={{'width': '100%', 'font-weight': 'bold'}}>{instruction}</span>);
      } else {
        text = (<span style={{'width': '100%'}}>{instruction}</span>);
      }
      return (
        <Row style={{'min-height': '50px', 'width': '100%', 'borderRadius': '25px', 'padding-right': '0px', 'margin-right': '0px'}}>
          <Col xs={1}>
            <Image src={instructionsNumbering[index]} style={{'width': '35px', 'height': '35px', 'borderRadius': '25px'}} />
          </Col>
          <Col xs={10} style={{'margin-bottom': '20px', 'margin-left': '9px', 'padding-right': '0px'}}>
            {text}
          </Col>
        </Row>
      )
    });
  }

  render() {
    return (
      <div style={{'min-width': '250px', 'width': '50vw', 'height': '100%', '-webkit-overflow-scrolling': 'touch', 'maxWidth': '790px'}}>
        <Container>
          <Row style={{"justify-content": "center", "align-items": "center"}}>
            <NavbarBrand style={{"color": "#8b0000", 'margin-top': '10px'}}><b>AnimeXP</b></NavbarBrand>
          </Row>
          <Row style={{"justify-content": "center", "align-items": "center"}}>
            <span style={{"color": "#D3D3D3", 'text-align': "center", 'font-weight': 'bold'}}>Personalized anime recommendations for you</span>
          </Row>
          <Row style={{"justify-content": "center", "align-items": "center"}}>
            <Image src={chibi_group} style={{'min-width': '175px','width': '40%', 'min-height': '200px', 'borderRadius': '25px'}}/>
          </Row>
        </Container>
        <div style={{'height': '100%', 'min-width': '250px', 'width': '50vw', 'maxWidth': '790px'}}>
          <Container style={{'padding-left': '0px', 'margin': '10px', 'min-height': '40vh',}}>
            <Row style={{"justify-content": "center", "align-items": "center", 'width': '48vw', 'min-width': '250px', 'maxWidth': '770px', 'margin-left': '5px'}}>
              <SearchFieldComponent search={this.searchForAnime} style={{'min-width': '200px', 'min-height': '40px', 'maxWidth': '570px'}}/>
            </Row>
            <Row style={{'margin-top': '2vh', 'width': '48vw', 'min-width': '250px', 'maxWidth': '770px', 'padding-right': '0px', 'margin-right': '0px'}}>
              <Col xs={0} md={2}/>
              <Col xs={12} md={10} style={{'padding-right': '0px'}}>
                {this.getInstructionsText()}
              </Col>
            </Row>
          </Container>
        </div>
      </div>
    );
  }
}

const styles = {
  'container': {
    'display': 'flex',
    'width': '50vw',
    'height': '90vh',
    'margin-top': '20px',
    'overflow-y': 'auto',
    '-webkit-overflow-scrolling': 'touch',
    },
    'section-horizontal-bottom': {
      'border-bottom': "4px solid rgba(255,255,255)",
      'border-bottom-left-radius': '2px',
      'border-bottom-right-radius': '2px'
    },
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
export default WelcomeComponent;
