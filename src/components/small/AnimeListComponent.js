import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.css'
import ReactGA from 'react-ga';
// import '../css/anime-card.css'
// import { Link } from "react-router-dom";
// import { bindActionCreators } from 'redux';
// import * as AnimeActions from '../actions/AnimeActions'
// import { updateAllAnime, updateAnAnime, saveCurrentAnime } from '../actions/AnimeActions';
// import { Image, Container, Col, Row , Carousel } from 'react-bootstrap';
//
// import plus_red_icon from '../img/plus_red.png'
import AnimeCardComponent from './AnimeCardComponent';
import { Image, Container, Col, Row , Carousel } from 'react-bootstrap';
import '../../css/search-bar.css'


const API = 'http://localhost:5000/anime/';

class AnimeListComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
    }

    this.loadAnime = this.loadAnime.bind(this);
    this.animeCardClick = this.animeCardClick.bind(this);
  }

  animeCardClick(e, index, anime) {
    ReactGA.event({
      category: 'Click',
      action: 'Anime List',
      label: `index: ${index}, listId: ${this.props.listObject['_id']}, animeId: ${anime[0]}`
    });
    this.props.setCurrentAnimeDescription(e, true, anime[0])
  }

  loadAnime() {
    const that = this;
    if (!this.props.listObject) {
      const fakeAnimes = [];
      for (let i = 0; i < 10; i++) {
        fakeAnimes.push(
          <div style={styles['anime-card-container-small']}/>
        )
      }
      return fakeAnimes;
    } else {
      //console.log("AnimeListComponent: listObject", this.props.listObject);
      return this.props.listObject.animeList.map((anime, index) => {
        if (anime == null || anime[0] == null) return;
        return (
          <a href={'/anime/' + anime[0]} onClick={(e) => {this.animeCardClick(e, index, anime)}}>
            <AnimeCardComponent id={index} src={anime[1]} style={{'flex': '0 0 auto', 'margin': '10px', 'margin': '10px', 'scrollSnapAlign': 'start', 'min-width': '100px', 'height': '150px'}}/>
          </a>
        );
      })
    }
  }

  render() {
    return (
      <Row style={{...styles['anime-horizontal-scroll-row'], 'padding-top': '5px', "margin": 0, 'padding-right': '0px', 'height': '100%',}}>
        <div style={{...styles['anime-list-container'], 'height': '100%',}}>
          <span style={styles['anime-list-title-section']}>{this.props.listObject ? this.props.listObject.animeListName : ("Empty List " + this.props.id)}</span>
          <div style={{...styles['container-for-horizontal-scroll-container'], 'margin-bottom': '17px'}}>
            <section style={{...styles["horizontal-scroll-container-anime-list"], 'background-color': 'transparent', 'scroll-snap-type': 'x mandatory', 'min-height': '170px'}}>
              {this.loadAnime()}
            </section>
          </div>
        </div>
      </Row>
    );
  }
}

const styles = {
  'anime-horizontal-scroll-row': {
    'padding-right': '0px',
    "justify-content": "center",
    "align-items": "center"
  },
  'container-for-horizontal-scroll-container': {
     "display": "flex", 'overflow-x': 'auto', "justify-content": "center", "align-items": "center"
  },
  'anime-list-title-section': {
    'font-size': '2em',
    'color': "white",
    'text-align': 'center'
  },
  'section-horizontal-bottom': {
    'border-bottom': "4px solid rgba(255,255,255)",
  },
  'section-horizontal-bottom-thin': {
    'border-bottom': "2px solid rgba(255,255,255)",
  },
  'section-vertical-right': {
    'borderRight': "1.5px solid rgba(255,255,255)",
  },
  'section-vertical-left': {
    'borderLeft': "1.5px solid rgba(255,255,255)",
  },
  'anime-list-container': {
    'flex-wrap': 'nowrap',
    'width': '100%',
    'border-bottom': "5px dashed #808080"
  },
  'list-recommendations-container': {
    'flex-wrap': 'nowrap',
    'width': '100%',
    'border-bottom': "5px dashed #808080"
  },
  "anime-card-container-mid": {
    'flex': '0 0 auto',
    'min-width': '250px',
    'height': '100px',
    'margin': '10px',

  },
  "anime-card-container-small": {
    'flex': '0 0 auto',
    'background-color': 'white',
    'min-width': '100px',
    'height': '100px',
    'margin': '10px',
  },
  'container': {
    'width': "100vw",
    'height': "100%"
  },
  "horizontal-scroll-container-anime-list": {
    "display": "flex",
    'overflow-x': 'auto',
    "width": "inline-flex",
    'flex-direction': "row",
    "min-height": "100px",
  },
  "horizontal-scroll-container-main": {
    "display": "flex",
    'overflow-x': 'auto',
    "width": "inline-flex",
    'flex-direction': "row",
  },
  "anime-card-container": {
    'background-color': 'white',
    'min-width': '100px',
    'height': '150px',
    'margin': '10px',

  },
  "anime-card-image": {
    "background-color": "black",
    'min-width': '200px',
    'min-height': '30px',
    'margin': '5px'
  },
  "anime-card-text": {

  }
}
export default AnimeListComponent;
