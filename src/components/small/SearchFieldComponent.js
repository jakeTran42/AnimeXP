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
import '../../css/search-bar.css'


const API = 'http://localhost:5000/anime/';

class SearchFieldComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      'text': this.props.preinput ? this.props.preinput : '',
    }
    // //console.log("Anime Description Component Called")
    // this.state = {
    //   'isAnimeDescriptionOpen': false
    // }
    // this.onUpdateAnime = this.onUpdateAnime.bind(this);
    // this.loadAnime = this.loadAnime.bind(this)
    // this.fetchAnime = this.fetchAnime.bind(this)
    this.updateSearchText = this.updateSearchText.bind(this)
    if (this.props.preinput && this.props.preinput.replace(" ", "") != "") {
      props.search(null, this.state.text)
    }
  }

  updateSearchText(e) {
    // //console.log('e:', e)
    // //console.log('e target:', e.target)
    // //console.log('e target value:', e.target.value)
    this.setState({'text': e.target.value})
  }

  render() {
    return (
      <div style={{...this.props.style, 'width': '25vw'}}>
        <form class="search-form" onSubmit={(e) => this.props.search(e, this.props.value)} style={{...this.props.style, 'width': '25vw'}}>
          <input type="search" value={this.state.text} onChange={this.updateSearchText} placeholder="Search" class="search-input" style={{'min-width': '170px', 'min-height': '40px', 'width': '22vw', 'margin-top': '-10px'}}/>
          <button type="submit" class="search-button" onClick={(e) => this.props.search(e, this.state.text)}>
            <svg class="submit-button">
              <use xmlnsXlink="http://www.w3.org/1999/xlink" xlinkHref="#search"></use>
            </svg>
          </button>
        </form>

        <svg xmlns="http://www.w3.org/2000/svg" width="0" height="0" display="none">
          <symbol id="search" viewBox="0 0 32 32">
            <path d="M 19.5 3 C 14.26514 3 10 7.2651394 10 12.5 C 10 14.749977 10.810825 16.807458 12.125 18.4375 L 3.28125 27.28125 L 4.71875 28.71875 L 13.5625 19.875 C 15.192542 21.189175 17.250023 22 19.5 22 C 24.73486 22 29 17.73486 29 12.5 C 29 7.2651394 24.73486 3 19.5 3 z M 19.5 5 C 23.65398 5 27 8.3460198 27 12.5 C 27 16.65398 23.65398 20 19.5 20 C 15.34602 20 12 16.65398 12 12.5 C 12 8.3460198 15.34602 5 19.5 5 z" />
          </symbol>
        </svg>
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
  // onUpdateAnime: updateAllAnime,
  // onUpdateAnAnime: updateAnAnime,
  // onSaveCurrentAnime: saveCurrentAnime
}
export default SearchFieldComponent;
