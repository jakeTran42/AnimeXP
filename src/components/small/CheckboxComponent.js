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
import '../../css/add-to-list.css'


const API = 'http://localhost:5000/anime/';

class CheckboxComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      'checked': false
    }
    this.clickHandler = this.clickHandler.bind(this);
    this.getValue = this.getValue.bind(this);
  }

  getValue(reverse) {
    if (reverse) {
      return this.state.checked == true ? "off" : "on";
    } else {
      return this.state.checked == true ? "on" : "off";
    }
  }

  clickHandler(e) {
    const target = e.target;
    const value = target.checked;
    this.setState({...this.state, checked: !this.state.checked}, () => {
      if (this.props.onClick) this.props.onClick(this.props.id, value);
    });
  }

  render() {
    return (
      <div>
        <div class="round">
          <input type="checkbox" id={"checkbox" + this.props.id} style={{...this.props.style}} checked={this.state.checked} onClick={this.clickHandler}/>
          <label for={"checkbox" + this.props.id}></label>
        </div>
      </div>
    );
  }
}


  // .round input[type="checkbox"]:checked + label {
  //   background-color: #66bb6a;
  //   border-color: #66bb6a;
  // }
  //
  // .round input[type="checkbox"]:checked + label:after {
  //   opacity: 1;
  // }




// }

  // render() {
  //   return (
  //     <div className="container">
  //       <img className="banner" src={this.state.anime ? this.state.anime.image_url_banner : "" } alt="This Anime Has No Banner Image"/>
  //
  //       <div className="card card-description card-footer center" >
  //         <div className="card-block center">
  //           <h2 className="card-text center">{this.state.anime ? this.state.anime.title_english : ""}</h2>
  //         </div>
  //         <img className="card-img-top center"  src={this.state.anime ? this.state.anime.image_url_lge: ""} alt="This Anime Has No Cover Art"/>
  //         <h4>AL: {this.state.anime ? this.state.anime.average_score: ""}%</h4>
  //         <p className="card-text center">{this.state.anime ? this.state.anime.description : ""}</p>
  //       </div>
  //
  //       <div className="card card-description card-footer center" >
  //         <div className="card-block center">
  //           <h2 className="card-text center">Episode List ({this.state.anime ? ((this.state.anime.total_episodes) == 0 ? this.state.anime.airing.next_episode - 1 : this.state.anime.total_episodes) : ""})</h2>
  //         </div>
  //       </div>
  //         { /*
  //           <a className="episode-list">Episode </a> <a className="episode-list">Episode </a>
  //           <a className="episode-list">Episode </a> <a className="episode-list">Episode </a>
  //           <br>
  //         */ }
  //
  //       <hr/>
  //       <form action="/anime/{this.state.anime ? this.state.anime.id : ''}" method="POST">
  //         <textarea className='form-control' name="content" placeholder="Comment"></textarea>
  //         <div className="pull-right">
  //           <button type="submit">Save</button>
  //         </div>
  //       </form>
  //       <hr/>
  //       {/*
  //       <div className="flex-col card-container">
  //         <div className="card-footer">
  //           <p id="title">
  //               <em>this.content</em>
  //           </p>
  //         </div>
  //       </div>
  //       <br>
  //       */}
  //     </div>
  //
  //   );
  // }


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
export default CheckboxComponent;
