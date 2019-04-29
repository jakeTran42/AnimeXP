import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
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

class AnimeListRecommendationsComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
    }

    this.loadAnime = this.loadAnime.bind(this)
    this.animeCardClick = this.animeCardClick.bind(this);
  }

  animeCardClick(e, index, anime) {
    ReactGA.event({
      category: 'Click',
      action: 'Anime Recommendations',
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
          <div style={styles['anime-card-container-mid']}/>
        )
      }
      return fakeAnimes;
    } else {
      if (this.props.listObject.animeRecommendations != null && this.props.listObject.animeRecommendations.length > 0) {
        return this.props.listObject.animeRecommendations.map((anime, index) => {
          if (anime == null || anime[0] == null) return;
          return (
            <a href={'/anime/' + anime[0]} onClick={(e) => {this.animeCardClick(e, index, anime)}}>
              <AnimeCardComponent id={index} src={anime[1]} style={{'flex': '0 0 auto', 'margin': '10px', 'margin': '10px', 'scrollSnapAlign': 'start', 'min-width': '150px', 'height': '200px'}}/>
            </a>
          );
        });
      } else {
        return (
          <div>
            <span>Currently no recommendations available for your anime selection in this list</span>
          </div>
        );
      }
    }
  }

  render() {
    return (
      <Row style={{'margin': '0px', 'height': '100%'}}>
        <Container style={{"margin": 0, "padding": 0, "max-width": "100%", 'height': '100%',}}>
          <Row style={{...styles['anime-horizontal-scroll-row'], 'padding-top': '5px', 'margin': '0px'}}>
            <div style={styles['anime-list-container']}>
              <div style={{...styles['container-for-horizontal-scroll-container']}}>
                <div style={{...styles["horizontal-scroll-container-anime-list"], 'scroll-snap-type': 'x mandatory', 'min-height': '225px'}}>
                  {this.loadAnime()}
                </div>
              </div>
            </div>
          </Row>
        </Container>
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
  'anime-list-container': {
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
  "horizontal-scroll-container-anime-list": {
    "display": "flex",
    'overflow-x': 'auto',
    "width": "inline-flex",
    'flex-direction': "row",
    "min-height": "100px",
  },
  "anime-card-container": {
    'background-color': 'white',
    'min-width': '100px',
    'height': '150px',
    'margin': '10px',

  },
}
export default AnimeListRecommendationsComponent;
