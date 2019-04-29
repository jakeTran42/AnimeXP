import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.css'
// import '../css/anime-card.css'
// import { Link } from "react-router-dom";
import { connect } from 'react-redux'
// import { bindActionCreators } from 'redux';
// import * as AnimeActions from '../actions/AnimeActions'
// import { updateAllAnime, updateAnAnime, saveCurrentAnime } from '../actions/AnimeActions';
// import { Image, Container, Col, Row , Carousel } from 'react-bootstrap';
//
// import plus_red_icon from '../img/plus_red.png'
import { Image, Container, Col, Row , Carousel } from 'react-bootstrap';
import '../../css/search-bar.css'


const API = 'http://localhost:5000/anime/';

class AnimeCardComponent extends Component {
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
  }

  render() {
    return (
      <div>
        {/*//console.log('Inside AnimeCardComponent, here are props:', this.props)*/}
        <Image onClick={this.props.onClick} animes={[0]} style={{'min-width': '200px', 'height': '250px', 'borderRadius': '10px', ...this.props.style,}} src={this.props.src}/>
      </div>
    );
  }
}


// Use selectors here
const mapStateToProps = (state) => {
  return {
    anime: state.anime.currentAnime
  }
}
// const mapDispatchToProps = (dispatch) => {
//   return bindActionCreators(AnimeActions, dispatch);
// }
const mapActionsToProps = {
  // onUpdateAnime: updateAllAnime,
  // onUpdateAnAnime: updateAnAnime,
  // onSaveCurrentAnime: saveCurrentAnime
}
export default AnimeCardComponent;
