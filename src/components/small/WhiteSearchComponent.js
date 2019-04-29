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
import axios from 'axios';

import chibi_group from '../../img/chibi_group.png'
import plus_red_icon from '../../img/plus_red.png'
import chibi_goku_god from '../../img/chibi_goku_god.png'
import chibi_naruto from '../../img/chibi_naruto.png'
import chibi_ash from '../../img/chibi_ash.png'
import chibi_joey_wheeler from '../../img/chibi_joey_wheeler.gif'
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
    //console.log('This was search text:', text)
    axios.get(baseAPI + '/search/anime/' + text).then(response => {
      //console.log('Response in search:', response)
      const data = response.data
      if (!(data instanceof Array) || !Array.isArray(data)) {
        //console.log("Data was not an array:", data);
        const anime = data;
        const animes = [
          {
            'id': anime[0],
            'title': anime[1][0],
            'posterImage': anime[2],
          }
        ];
        this.setState({ animes })

      } else {
        const animes = data.map((anime, index) => {
          //console.log('Anime before adding:', anime)
          return {
            'id': anime[0],
            'title': anime[1][0],
            'posterImage': anime[2],
          }
        })
        this.setState({ animes })
      }

    }).catch(err => {
      //console.log('Error occurred in search at:', err)
    })
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

  render() {
    return (
      <div style={{"padding-top": '50px', 'min-width': '250px', 'width': '50vw', 'height': '100%', '-webkit-overflow-scrolling': 'touch', 'maxWidth': '790px'}}>
        <Container>
          <Row style={{"justify-content": "center", "align-items": "center"}}>
            <Image src={chibi_group} style={{'min-width': '175px','width': '40%', 'min-height': '200px', 'borderRadius': '25px'}}/>
          </Row>
        </Container>
        <div style={{'height': '100%', 'min-width': '250px', 'width': '50vw', 'maxWidth': '790px'}}>
          <Container style={{'padding-left': '0px', 'margin': '10px', 'min-height': '40vh',}}>
            <Row style={{...styles['section-horizontal-bottom'], "justify-content": "center", "align-items": "center", 'width': '48vw', 'min-width': '250px', 'maxWidth': '770px'}}>
              <SearchFieldComponent search={this.searchForAnime} style={{'min-width': '200px', 'min-height': '40px', 'maxWidth': '570px'}}/>
            </Row>
            <Row style={{'margin-top': '50px'}}>
              {this.loadSearchResults()}
            </Row>
          </Container>
          <Image src={this.loadChibiCharacter()} style={{'float': 'right','min-width': '170px', 'min-height': '200px', 'width': "25vw", 'height': '100vw', 'max-height': '500px', 'maxWidth': '400px'}} />
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
