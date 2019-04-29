import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.css'
import { connect } from 'react-redux'
import '../../css/add-to-list.css'

import AnimeCardComponent from './AnimeCardComponent';


const API = 'http://localhost:5000/anime/';

class AnimeListComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
    }
    this.getAnime = this.getAnime.bind(this)
  }

  getAnime() {
    const that = this;
    if (!that.props.list) {
      const anime = [];
      for(let i = 1; i < 16; i++) {
        anime.push(
          <div id={i} style={styles['anime-card-container']}></div>
        )
      }
      return anime
    }
    const anime = that.props.list.anime.map((anime, index) => {
      // //console.log(index, 'anime is', anime)
      return (
        <AnimeCardComponent id={index} src={anime.posterImage} style={{...styles['anime-card-container-small'], 'background-color': "transparent"}} />
      );
    });
    return anime
  }

  render() {
    return (
      <div>
        <div style={styles['anime-list-container']}>
          <span style={styles['anime-list-title-section']}>{this.props.list['name']}</span>
          <section style={{...styles["horizontal-scroll-container-anime-list"], 'background-color': 'transparent'}}>
            {this.getAnime()}
          </section>
        </div>
      </div>
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
     "display": "flex",
     '-webkit-overflow-scrolling': 'touch',
     'overflow-x': 'auto',
     "justify-content": "center",
     "align-items": "center"
  },
  'anime-list-title-section': {
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
    'height': '175px',
    'border-bottom': "5px dashed #808080"
  },
  'list-recommendations-container': {
    'flex-wrap': 'nowrap',
    'width': '100%',
    'height': '175px',
    'border-bottom': "5px dashed #808080"
  },
  "anime-card-container-mid": {
    'flex': '0 0 auto',
    'background-color': 'white',
    'min-width': '150px',
    'height': '150px',
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
    '-webkit-overflow-scrolling': 'touch',
    "width": "inline-flex",
    'flex-direction': "row",
    "min-height": "100px",
  },
  "horizontal-scroll-container-main": {
    "display": "flex",
    'overflow-x': 'auto',
    '-webkit-overflow-scrolling': 'touch',
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
export default AnimeListComponent;
