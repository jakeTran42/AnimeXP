import React, { Component, Fragment } from 'react';
import { Link } from "react-router-dom";
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux';
// import * as AnimeActions from '../actions/AnimeActions'
import { updateAllAnime, updateAnAnime, saveCurrentAnime } from '../../actions/AnimeActions';
import { Image, Container, Col, Row , Carousel } from 'react-bootstrap';
import YouTube from 'react-youtube';

import {rootStyles} from '../../App.js'
import AddToListComponent from './AddToListComponent';
import AnimeCardComponent from './AnimeCardComponent';
import LoadingSpinnerComponent from './LoadingSpinnerComponent';
import { Media, Button, Form, FormGroup, Label, Input, FormText } from 'reactstrap';

import plus_red_icon from '../../img/plus_red.png'
import galaxy_background from '../../img/galaxy.jpeg'
import ReactGA from 'react-ga';



const API = 'http://localhost:5000/anime/';

class AnimeDescriptionComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      'addingToList': false,
      'showReviews': false,
    }
    // //console.log("Anime Description Component Called")
    // this.state = {
    //   'isAnimeDescriptionOpen': false
    // }
    // this.onUpdateAnime = this.onUpdateAnime.bind(this);
    // this.loadAnime = this.loadAnime.bind(this)
    // this.fetchAnime = this.fetchAnime.bind(this)
    this.getAnimeInfo = this.getAnimeInfo.bind(this)
    this.setupTopSection =  this.setupTopSection.bind(this)
    this.toggleAddToList = this.toggleAddToList.bind(this)
    this.calculateMinMarginTop = this.calculateMinMarginTop.bind(this)
    this.getStreamingEpisodes = this.getStreamingEpisodes.bind(this)
    this.getReviews = this.getReviews.bind(this)
  }

  getAnimeInfo(info) {
    if (!this.props.currentAnime) return null;
    ////console.log('This is current anime in AnimeDescriptionComponent:', this.props.currentAnime)

    switch(info) {
      case 'background-image':
        if (this.props.currentAnime.coverImage) {
          return this.props.currentAnime.coverImage
        } else {
          return galaxy_background
        }
      case 'poster-image':
        if (this.props.currentAnime.posterImage) {
          return this.props.currentAnime.posterImage
        } else {
          return null
        }
      case 'title':
        if (this.props.currentAnime.title) {
          return this.props.currentAnime.title
        } else {
          return null
        }
      case 'description':
        if (this.props.currentAnime.description) {
          // let e = document.createElement('div');
          // e.innerHTML = this.props.currentAnime.description;
          // return e.childNodes.length === 0 ? "wrong" : e.childNodes[0].nodeValue;
          return this.props.currentAnime.description;
        } else {
          return "wrong 2";
        }
      case 'youtube-id':
        if (this.props.currentAnime.youtubeTrailerId) {
          return this.props.currentAnime.youtubeTrailerId
        } else {
          return null
        }

    }
  }

  getStreamingEpisodes() {
    if (!this.props.currentAnime) return;

    if (!this.props.currentAnime.animeStreamingEpisodes || this.props.currentAnime.animeStreamingEpisodes.length == 0) {
      return (
        <div style={{'text-align': 'center', 'width': '100%'}}>
          We currently don't have the streaming links for this anime. <br/>
          We update our database every week, so we'll most likely have this anime on Sunday.
        </div>
      );
    }

    return this.props.currentAnime.animeStreamingEpisodes.map((episode, index) => {
      return (
        <Col xs={6} md={3}>
          <a target="_blank" href={episode['url']} onClick={() => {
              ReactGA.event({
                category: 'Click',
                action: 'Streaming',
                label: `url: ${episode['url']}`
              });
            }}
            style={{'width': '100%', 'font-size': '1.5em', 'color': 'white', 'margin-bottom': '15px'}}>
            <Container>
              <Row><Image src={episode['thumbnail']} style={{'height': '150px', 'width': '125px'}}/></Row>
              <Row><span style={{'font-size': '0.8em', 'color': rootStyles['secondaryColorRed'], 'margin-bottom': '15px'}}>{episode['title']}</span></Row>
            </Container>
          </a>
        </Col>
      );
    });
  }

  calculateMinMarginTop(percentage_view_height, isBanner) {
    // let banner = document.getEl
    // let marginTop = (view_height < 400 ? 400 : view_height) * -1;
    // base * -1;

    // let height = Math.max(document.documentElement.clientHeight, window.innerHeight || 0
    let height = document.documentElement.clientHeight;
   //console.log("isBanner", isBanner,"0AnimeDescriptionComponent, document.documentElement.clientHeight:", document.documentElement.clientHeight)
   //console.log("0AnimeDescriptionComponent, window.innerHeight:", window.innerHeight)
    if (height > 400) {
      height *= (percentage_view_height / 100)
     //console.log("isBanner", isBanner,"1AnimeDescriptionComponent, new calculated height:", height);
     //console.log("isBanner", isBanner,'2returning: -410/-390')
      return isBanner ? (-400 + 'px') : (-390 + 'px') //384
      // if (height < -396) {
      //  //console.log("isBanner", isBanner,'2returning: -410/-390')
      //   return isBanner ? (-400 + 'px') : (-390 + 'px') //384
      // } else {
      //  //console.log("isBanner", isBanner,'3returning:', height)
      //   return (height + 'px')
      // }
    } else {
     //console.log("isBanner", isBanner,'4returning: outermost if -450px/390px')
      return isBanner ? (-400 + 'px') : (-390 + 'px')
    }

  }

  setupTopSection() {
    if (this.state.addingToList) {
      return (<div>
        <AddToListComponent createList={this.createList} animeLists={this.props.animeLists} currentAnime={this.props.currentAnime} setIsLoading={this.props.setIsLoading}/>
        <Row style={{"justify-content": "center", "align-items": "center"}}>
          <AnimeCardComponent  src={this.getAnimeInfo('poster-image')}/>
          {/*div style={{'width': '150px', 'height': '200px', 'background-color': 'black'}}></div>*/}
        </Row>
      </div>);
    } else {
      return (<div>
        {/*SECTION: Banner Image*/}
        <Row>
          {/*If image is null then remove this section*/}
          <Image style={{'width': '100%', 'height': '30vh', 'borderRadius': '25px', 'min-height': '400px', 'max-height': '400px'}} src={this.getAnimeInfo('background-image')}></Image>
          <div style={{'width': '100%', 'height': '30vh', 'background-color': "rgba(0,0,0,0.5)", 'margin-top': "-400px", 'borderRadius': '25px', 'min-height': '400px', 'max-height': '400px'}} />
          <Image src={plus_red_icon} style={
              {"height": "4vw", 'max-height': "45px", 'min-height': '35px', 'vertical-align': 'middle', 'margin-top': "-390px", 'padding-left': '10px'}
            }
            onClick={this.toggleAddToList}
          />
        </Row>

        {/*SECTION: Post Image*/}
        <Row style={{"justify-content": "center", "align-items": "center", 'margin-top': '-60px'}}>
          <AnimeCardComponent  src={this.getAnimeInfo('poster-image')}/>
        </Row>
      </div>);
    }
  }

  toggleAddToList() {
    this.setState({'addingToList': !this.state.addingToList})
  }


  onYouTubeReady(event) {
    // access to player in all event handlers via event.target
    event.target.pauseVideo();
  }

  getReviews() {
    if (!this.state.showReviews || !this.props.currentAnime) return;
    ////console.log('This is current anime:', this.props.currentAnime)

    if (!this.props.currentAnime.reviews || this.props.currentAnime.reviews.length == 0) {
      return (
        <div style={{'text-align': 'center', 'width': '100%', 'margin-bottom': '20px'}}>
          We currently don't have reviews for this anime. <br/>
        </div>
      );
    }

    return this.props.currentAnime.reviews.map((review, index) => {
      if (!review.body) return;
      let htmlObjs =[];
      htmlObjs.push(
        (
          <span style={{'font-weight': 'bold'}}>
            Review {index + 1} :
            <br/>
          </span>
        )
      );
      let reviewSetences = review.body.split(". ")
      htmlObjs = htmlObjs.concat(
        reviewSetences.map((sentence, index) => {
          if (index % 4 == 0) {
            return (
              <span>
                {sentence + "."}
                <br/>
                <br/>
              </span>
            );
          } else {
            return (
              <span>
                {sentence + ". "}
              </span>
            );
          }
        })
      );
      return (
        <Row>
          <span>{htmlObjs}</span>
          <br/>
          <br/>
          <br/>
          <br/>
        </Row>
      );
    });
  }
  render() {
    return (
      <div>
        <div style={{'-webkit-overflow-scrolling': 'touch'}}>
          <Container>
            {this.setupTopSection()}

            {/*SECTION: Anime Title*/}
            <Row style={{"justify-content": "center", "align-items": "center", 'paddingBottom': '20px'}}>
              <div style={{'color': 'black', 'font-size': '2em', 'font-weight': 'bold', 'text-align': 'center'}}>{this.getAnimeInfo('title')}</div>
            </Row>

            {/*SECTION: Anime Description*/}
            <Row style={{"justify-content": "center", "align-items": "center", 'paddingBottom': '20px'}}>
              <div style={{'color': 'black', 'font-size': '1.1em', 'text-align': 'center'}} dangerouslySetInnerHTML={{ __html: this.getAnimeInfo('description')}}></div>
            </Row>

            {/* SECTION: Video Trailer */}
            <Row style={{"justify-content": "center", "align-items": "center", 'paddingBottom': '20px'}}>
              <div className={"d-none d-sm-none d-md-block"}>
                <YouTube
                  videoId={this.getAnimeInfo('youtube-id')}
                  opts={{'playerVars': {'autoplay': 1, 'hl': 'en', 'cc_lang_pref': 'en', 'cc_load_policy': 1, 'color': "red", 'yt:cc': 'on', 'frameborder': "0", 'iv_load_policy': 1}}}
                  onReady={this.onYouTubeReady}
                />
            </div>
              <div className={"d-md-none d-lg-none d-xl-none"}>
                <YouTube
                  videoId={this.getAnimeInfo('youtube-id')}
                  opts={{'height': '350px', 'width': '300px', 'playerVars': {'autoplay': 1, 'hl': 'en', 'cc_lang_pref': 'en', 'cc_load_policy': 1, 'color': "red", 'yt:cc': 'on', 'frameborder': "0", 'iv_load_policy': 1}}}
                  onReady={this.onYouTubeReady}
                />
            </div>
            </Row>

            {/* SECTION: Reviews*/}
            <Row>
              <Row style={{'width': '100%', "justify-content": "center", "align-items": "center", 'margin-top': '20px', 'margin-bottom': '20px'}}>
                <Button style={{'background-color': rootStyles['secondaryColorRed'], color: "white"}} onClick={
                    () => {
                      this.setState({...this.state, showReviews: !this.state.showReviews}, () => {
                        ReactGA.event({
                          category: 'Click',
                          action: 'Reviews',
                          label: `showReviews: ${this.state.showReviews}`
                        });
                      });
                    }}>
                  {this.state.showReviews ? "Hide Reviews" : "Show Reviews"}
                </Button>
              </Row>
              <Row style={{'width': '100%', 'margin-left': '30px', 'margin-right': '30px'}}>
                {this.getReviews()}
              </Row>
            </Row>


            {/*SECTION: Anime Episodes*/}
            <Row>
              {this.getStreamingEpisodes()}
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
export default AnimeDescriptionComponent;
