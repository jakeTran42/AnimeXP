import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.css'
import '../css/anime-card.css'
import { Link } from "react-router-dom";
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux';
// import * as AnimeActions from '../actions/AnimeActions'
import {rootStyles, baseAPI} from '../App.js'
import { saveNewAnimeList, saveAllAnimeLists, } from '../actions/AnimeActions';
import { Image, Container, Col, Row , Carousel } from 'react-bootstrap';
import Modal from 'react-responsive-modal';
import axios from 'axios';
import Switch from "react-switch";
import ReactGA from 'react-ga';

import AuthenticationComponent from './small/AuthenticationComponent';
import WelcomeComponent  from './small/WelcomeComponent'
import LoadingSpinnerComponent from './small/LoadingSpinnerComponent';
import AnimeDescriptionComponent from './small/AnimeDescriptionComponent';
import CreateListComponent from './small/CreateListComponent';
import SearchComponent from './small/SearchComponent';
import AnimeCardComponent from './small/AnimeCardComponent';
import AnimeListComponent from './small/AnimeListComponent';
import AnimeListRecommendationsComponent from './small/AnimeListRecommendationsComponent';
import {
  SEARCHING_MODAL_STATUS, ANIME_DESCRIPTION_MODAL_STATUS,
  CREATING_LIST_MODAL_STATUS, AUTHENICATION_MODAL_STATUS
} from '../App.js';

// CSS imports
import './Homepage.css'
import plus_red_icon from '../img/plus_red.png'
import next_icon from '../img/next_white.png'
import back_icon from '../img/back_white.png'

// Homepage Cpmponents
import UserAnimeList from './HomeComponents/UserAnimeList'
import AnimeDisplay from './NewCss/HomePage/animeDisplay'

class HomePageComponent extends Component {
  constructor(props) {
    super(props);

    let isAtRoot = true
    let urlCategory = null
    let animeIndex = null
    let listIndex = null

    let pathArr = props.location['pathname'].toLowerCase().split("/")
    pathArr = pathArr.filter(x => x.length > 0)
    //console.log('This is path:', pathArr)
    if (pathArr.length > 0) {
      isAtRoot = false;
      switch (pathArr[0]) {
        case('anime'):
          urlCategory = 'anime';
          animeIndex = parseInt(pathArr[1]) ? (parseInt(pathArr[1]) < 1 ? 1 : parseInt(pathArr[1])) : 1
          break;
        case('list'):
          urlCategory = 'list'
          listIndex = parseInt(pathArr[1]) ? (parseInt(pathArr[1]) < 1 ? 1 : parseInt(pathArr[1])) : 1
          break;
        case('search'):
          urlCategory = 'search'
          break
        case('login'):
          urlCategory = 'login'
          break
        case('register'):
          urlCategory = 'register'
          break

      }
    }

    this.state = {
      isLoading: false,
      API: baseAPI,
      isAtRoot,
      urlCategory,
      animeIndex,
      listIndex,
      calledForMostPopular: false,
      anime: [],
      textToSearch: "",
      mobile: {
        listIndex: 0,
        isShowingRecs: true
      },
      userListEmpty: false,
      recommendationSelected: true
    }

    //console.log("these are state:", this.state)
    this.onUpdateAnime = this.onUpdateAnime.bind(this);
    this.loadAnime = this.loadAnime.bind(this)
    this.getAnime = this.getAnime.bind(this)

    this.loadMostPopularAnime = this.loadMostPopularAnime.bind(this)
    this.getMostPopularAnime = this.getMostPopularAnime.bind(this)

    this.toggleAnimeDescription = this.toggleAnimeDescription.bind(this)
    this.toggleCreateList = this.toggleCreateList.bind(this)
    this.toggleSearch = this.toggleSearch.bind(this)
    this.setAnimeById = this.setAnimeById.bind(this)
    this.getListById = this.getListById.bind(this)
    this.getAnimeLists = this.getAnimeLists.bind(this)
    this.setCurrentAnimeDescription = this.setCurrentAnimeDescription.bind(this)
    this.loadLowerSection = this.loadLowerSection.bind(this)
    this.loadAnimeListsRecommendations = this.loadAnimeListsRecommendations.bind(this)
    this.loadModals = this.loadModals.bind(this)
    this.desktopLowerSection = this.desktopLowerSection.bind(this)
    this.mobileLowerSection = this.mobileLowerSection.bind(this)
    this.createList = this.createList.bind(this)
    this.setupNetworkCalls = this.setupNetworkCalls.bind(this)
    this.getAnimeLists = this.getAnimeLists.bind(this)
    this.incrementMobileListIndex = this.incrementMobileListIndex.bind(this)
    this.setIsLoading = this.setIsLoading.bind(this);
    this.openSearchWithText = this.openSearchWithText.bind(this)
    this.toggleAuth = this.toggleAuth.bind(this)

    if (!this.state.isAtRoot) {
      switch (this.state.urlCategory) {
        case('anime'):
          this.setCurrentAnimeDescription(null, true, this.state.animeIndex)
          break;
        case('list'):
          this.getListById(this.state.listIndex)
          break;
        case('search'):
          this.toggleSearch(null)
          break
        case('login'):
          this.toggleAuth(null);
          break;
        case('register'):
          this.toggleAuth(false);
          break;
      }
    }
  }

  openSearchWithText(text) {
    if (!text || text.replace(" ", "") == '') return;
    this.setState({...this.state, 'textToSearch': text}, () => {
      this.toggleSearch();
    });
    ReactGA.event({
      category: 'Search',
      action: 'Search With Text',
      label: text
    });
  }

  getAllAnimeLists() {
    let userId = this.props.cookies.get('userId');
    if (userId) {
      axios.get(baseAPI + '/user/' + userId + '/lists').then(response => {
        let data = response.data;
        this.setState({...this.state, 'animeLists': data['userAnimeList']})
      }).catch(err => {

      });
    }
  }

  createList(e, listName, listDescription, animeId) {
    if (e) {
      //console.log('Create list called by e.target:', e.target)
    } else {
      //console.log('Create list called without an event')
    }
    //console.log('Create list animeId:', animeId)
    let userId = this.props.cookies.get('userId');
    if (userId) {
      axios.post(baseAPI + '/user/new/list', {
        'userID': userId,
        'name': listName,
        'description': listDescription,
        'list': animeId ? [animeId] : []
      }).then((response) => {
        this.props.saveNewAnimeList(response.data)
        this.setIsLoading(false, true);
      }).catch(err => {
        //console.log('Err:', err)
      })
    } else {
      axios.post(baseAPI + '/new/implicit/user', {
        name: listName,
        description: listDescription,
        list: animeId ? [animeId] : []
      }).then((response) => {
        //console.log("Create implicit user response:", response)
        let data = response.data;
        let userId = data.UserID;
        let d = new Date();
        d.setTime(d.getTime() + (60*24*365)*60*1000) //Expires in one year
        this.props.cookies.set('userId', userId, { path: '/', expires: d});
        this.getAnimeLists()
        this.setIsLoading(false, true)
      }).catch((err) => {
        //console.log('Err:', err);
      })
    }
    this.setIsLoading(true, false);
    ReactGA.event({
      category: 'Create List',
      action: 'Creating list',
      label: `listName: ${listName}, listDescription: ${listDescription}, animeId: ${animeId}`
    });
  }

  getListById(id) {
    const that = this;
    let route = this.state.API + '/search/list/' + String(id)
    //console.log('Getting most popular anime at:', route)
    axios.get(route).then((response) => {

    }).catch((err) => {

    })
  }

  setAnimeById(id) {
    const that = this;
    let route = this.state.API + '/search/anime/' + String(id);
    axios.get(route).then(response => {
      //console.log('In setAnimeById:', response)
      let anime = Array.isArray(response.data) ? response.data[0] : response.data;
     //console.log('In setAnimeById 2:', anime)
      return {
        'id': anime['animeId'],
        'slug': anime['animeSlug'],
        'title': anime['animeTitles'][0] ? anime['animeTitles'][0] : anime['animeTitles'][1],
        'coverImage': anime['animeCoverImg'],
        'posterImage': anime['animePicUrl'],
        'description': anime['animeSynopsis'],
        'youtubeTrailerId': anime['animeYoutubeTrailerURl'],
        'animeStreamingEpisodes': anime['animeStreamingEpisodes'],
        'reviews': anime['animeReviews']
      }
    }).then(anime => {
      //console.log("setAnimeById - Got animeObj:", anime)
      this.toggleAnimeDescription(null, anime);
    }).catch((err) => {
      //console.log("Error in setAnimeById:", err);
    })
  }

  getMostPopularAnime() {
    if (this.state.calledForMostPopular || this.props.mostPopularAnime) return;
    const that = this;
    let route = this.state.API + '/popular/anime/v1'
    //console.log('Getting most popular anime at:', route)
    axios.get(route).then((response) => {
      //console.log('response', response)
      let data = response.data
      let animes_array = []
      data.forEach((anime) => {
        try {
          animes_array.push({
            'id': anime['animeId'],
            'slug': anime['animeSlug'],
            'title': anime['animeTitles'][0],
            'coverImage': anime['animeCoverImg'],
            'posterImage': anime['animePicUrl'],
            'description': anime['animeSynopsis'],
            'youtubeTrailerId': anime['animeYoutubeTrailerURl'],
          })
        } catch (e) {
          //console.log("Error occurred while getting most popular at:", e)
        }
      })
      // //console.log('Animes array:', animes_array)
      that.props.saveMostPopularAnime(animes_array)
    }).catch((error) => {
      //console.log('error occurred for route', route, error)
    })
    this.setState({calledForMostPopular: true})
  }

  loadMostPopularAnime() {
    const that = this;
    if (!that.props.mostPopularAnime) {
      const anime = [];
      for(let i = 1; i < 16; i++) {
        anime.push(
          <div id={i} style={styles['anime-card-container']}></div>
        )
      }
      return anime;
    } else {
      const anime = that.props.mostPopularAnime.map((anime, index) => {
        // //console.log(index, 'anime is', anime)
        return (
          <a href={'/anime/' + anime['id']} onClick={(e) => (that.setCurrentAnimeDescription(e, true, anime['id']))}>
            <AnimeCardComponent id={index} src={anime.posterImage} style={{'flex': '0 0 auto', 'margin': '10px'}}/>
          </a>
        );
      });
      return anime;
    }

  }

  toggleAnimeDescription(e, anime) {
    //console.log("Toggle occurred anime:", anime)
    //console.log('Toggle occurred:', e ? e.target : null)
    //console.log('This is props:', this.props)

    this.setState({currentAnime: anime}, () => {
      let status = this.state.currentAnime === undefined ? '' : ANIME_DESCRIPTION_MODAL_STATUS
      if (status !== ANIME_DESCRIPTION_MODAL_STATUS) this.props.history.push('/')
      this.props.updateModalStatus(status)
      this.setIsLoading(false, false);
    })
  }

  toggleCreateList(e) {
    //console.log('Toggle occurred:', e ? e.target : null)
    //console.log('This is props:', this.props)

    let status = this.props.modalStatus === CREATING_LIST_MODAL_STATUS ? '' : CREATING_LIST_MODAL_STATUS
    if (status !== CREATING_LIST_MODAL_STATUS) this.props.history.push('/')
    this.props.updateModalStatus(status)
    this.setIsLoading(false, false);

    // this.setState({currentAnime: anime}, () => {
    //   this.props.updateModalStatus(this.state.currentAnime === undefined ? '' : ANIME_DESCRIPTION_MODAL_STATUS)
    // })
  }

  toggleSearch(e) {
    //console.log("this is this:", this)
    if (!this.props['updateModalStatus']) return
    if (e) {
      //console.log('Toggle occurred:', e.target)
      this.setState({...this.state, 'textToSearch': ''}, () => {
        this.props.history.push('/')
        this.props.updateModalStatus('')
      });

    } else {
      this.props.history.push('/search')
      this.props.updateModalStatus(SEARCHING_MODAL_STATUS)
    }
    this.setIsLoading(false, false);
  }

  toggleAuth(authenticated) {
    //console.log("this is this:", this)
    if (!this.props['updateModalStatus']) return
    if (authenticated) {
      //console.log('Toggle occurred:', e.target)
      this.props.updateModalStatus('');
      this.props.history.push('/');

    } else {
      // this.props.history.push('/search')
      this.props.updateModalStatus(AUTHENICATION_MODAL_STATUS)
    }
    this.setIsLoading(false, false);
  }

  onUpdateAnime() {
    this.props.onUpdateAnime(this.state.anime);
  }

  getAnime(e, anime) {
    //console.log("Current target in getAnime: ", e.target)
    //console.log("Current anime in getAnime: ", anime)
    this.props.onSaveCurrentAnime(anime)
  }

  setCurrentAnimeDescription(e, isJustId, anime) {
    if (e) {
      e.stopPropagation();
      e.nativeEvent.stopImmediatePropagation();
      e.preventDefault()
    }
    //console.log('isJustId:', isJustId, 'anime:', anime)
    if (isJustId) {
      this.props.history.push('/anime/' + anime)
      this.setAnimeById(anime);
    } else {
      this.props.history.push('/anime/' + anime['animeId'])
      this.toggleAnimeDescription(null, anime);
    }
  }

  loadAnime() {
    // const anime = this.state.anime.map((anime, index) => {
    //   return (
    //     <div className="flex-col mb-2 ml-2 card-container">
    //       <Link key={index} to={`anime/${anime.id}`} onClick={(e) => {this.getAnime(e, anime)}}>
    //       <img className="card-img-top" src={anime.image_url_lge} />
    //       <div className="card-footer card-footer-gray-background card-footer-white-text">
    //         <p id="title" className="text-capitalize text-len-200">
    //             <em>{anime.title_english}</em>
    //         </p>
    //         <p id="score">AL: {anime.average_score}%</p>
    //       </div>
    //     </Link>
    //   </div>
    //   );
    // });
    // return anime;
  }

  getAnimeLists() {
    const that = this;
    let route = this.state.API + '/' + this.props.userId + '/lists'
    //console.log('Getting most popular anime at:', route)
    axios.get(route).then((response) => {

    }).catch((err) => {

    })
  }

  loadAnimeLists() {
    if (!this.props.animeLists) {
      //this.getAnimeLists()
      const fakeAnimeLists = [];
      for (let i = 1; i < 6; i++) {
        fakeAnimeLists.push(
          <AnimeListComponent id={i}/>
        )
      }
      return fakeAnimeLists;
    } else {
      if (this.props.animeLists.length == 0) return;
      return this.props.animeLists.map((listObject, index) => {
        return (
          <AnimeListComponent id={index} listObject={listObject}
            setCurrentAnimeDescription={this.setCurrentAnimeDescription}
            />
        );
      });
    }
  }

  loadAnimeListsRecommendations() {
    if (!this.props.animeLists) {
      const fakeAnimeListsRecommendations = [];
      for (let i = 1; i < 6; i++) {
        fakeAnimeListsRecommendations.push(
          <AnimeListComponent id={i}/>
        )
      }
      return fakeAnimeListsRecommendations;
    } else {
      return this.props.animeLists.map((listObject, index) => {
        return (
          <AnimeListRecommendationsComponent id={index} listObject={listObject}
            setCurrentAnimeDescription={this.setCurrentAnimeDescription}
           />
        );
      });
    }
  }

  desktopLowerSection() {
    //this.props.animeLists
    return (
      <Row style={{"margin": 0, 'padding-right': '0px', 'height': '100%', 'width': '100vw'}}>
        {/*SECTION: Anime Lists*/}
        <Col xs={12} sm={4} style={{...styles['section-vertical-right'], 'width': '100%', 'height': '100%', 'margin': '0px',}}>
          <Container style={{"margin": 0, "padding": 0, "max-width": "100%", 'margin-bottom': '75px'}}>

            <Row style={{...styles['section-horizontal-bottom-thin'], 'padding-top': '10px', "margin": 0, 'padding-right': '0px'}}>
              <div style={{'margin-left': 'auto', 'text-align': 'center', "color": "white", "text-align": 'center', 'padding-left': "50px", 'font-size': "2em", "justify-content": "center",
              "align-items": "center", 'font-weight': 'bold'}}>Anime Lists</div>
              <div style={{'height': '100%', "float": "right", "margin-left": "auto", "margin-right": 0, 'padding-right': '10px'}}>
                <Image src={plus_red_icon} style={
                    {"height": "35px", 'vertical-align': 'middle', 'margin-bottom': '10px'}
                  }
                  onClick={this.toggleCreateList}
                />
              </div>
            </Row>
            {this.loadAnimeLists()}
          </Container>
        </Col>

        {/*SECTION: Anime List Recommendations*/}
        <Col xs={12} sm={8} style={{...styles['section-vertical-left'], 'width': '100%', 'height': '100%', 'margin': '0px', 'padding-right': "0px"}}>
          <Container style={{"margin": 0, "padding": 0, "max-width": "100%",}}>
            <Row style={{...styles['section-horizontal-bottom-thin'], 'padding-top': '10px', "margin": 0, 'padding-right': '0px'}}>
              <span style={{"color": "white", "text-align": 'center', 'padding-left': "50px", 'font-size': "1.8em", 'margin-top': '.17em', "justify-content": "center",
              "align-items": "center", 'paddingBottom': '7px'}}>Recommendations</span>
            </Row>
            {this.loadAnimeListsRecommendations()}
          </Container>
        </Col>
      </Row>
    );
  }

  mobileLowerSection() {
    let listName = [];
    let animes = [];
    if (!this.props.animeLists || this.props.animeLists.length == 0) {
      let list = [];
      for (let i = 0; i < 4; i++) {
        list.push(<div style={{...styles['anime-card-container-mid'], 'width': '100%', 'height': '120vw'}}/>)
      }
      animes = list;
      listName = 'List 1'
    } else {

      listName = this.props.animeLists[this.state.mobile.listIndex]['animeListName']
      let key = !this.state.mobile.isShowingRecs ? 'animeList' : 'animeRecommendations';
      //console.log('HomePageComponent mobile if statement about to be called');
      if (this.props.animeLists[0] && ((key == 'animeList'  && this.props.animeLists[0]['animeList']) ||
        (key == 'animeRecommendations' && this.props.animeLists[0]['animeRecommendations']))) {
        animes = this.props.animeLists[this.state.mobile.listIndex][key].map((anime, index) => {
          if (anime == null || anime[0] == null) return;
          return (
            <a href={'/anime/' + anime[0]} onClick={(e) => (this.setCurrentAnimeDescription(e, true, anime[0]))}>
              <AnimeCardComponent id={index} src={anime[1]} style={{'flex': '0 0 auto', 'margin': '10px'}}/>
            </a>
          );
        });
        animes.push((<div style={{'height': '140px'}}/>));
      }
    }

    return (
      <Row style={{'margin': '0px', 'margin-top': '10px', 'width': '100vw'}}>
        <Container>
          <Row>
            <Col xs={2} style={{'padding': '0px', "float": "right", "margin-left": "auto", "margin-right": '5px', 'display': 'inline-block' }}>
                <Image src={plus_red_icon} style={
                    {"max-height": "4vh", 'min-height': "35px", 'vertical-align': 'middle', 'margin-bottom': '10px'}
                  }
                  onClick={this.toggleCreateList}
                />
            </Col>
            <Col xs={12} style={{'padding': '0px', 'display': 'inline-block'}}>
              <Col xs={3} sm={3} md={3} lg={3} xl={3} style={{'margin': '0px', 'padding': '0px', 'display': 'inline-block'}}>
                <Image src={back_icon} style={{'width': "40px"}} onClick={(e) => {this.incrementMobileListIndex(false)}}/>
              </Col>
              <Col xs={6} sm={6} md={6} lg={6} xl={6} style={{'color': 'white', 'font-size': '2em', 'margin': '0px', 'margin': '0px', 'padding': '0px', 'display': 'inline-block'}}>
                {listName}
              </Col>
              <Col xs={3} sm={3} md={3} lg={3} xl={3} style={{'display': 'inline-block'}}>
                <Image src={next_icon} style={{'width': "40px"}} onClick={(e) => {this.incrementMobileListIndex(true)}}/>
              </Col>
            </Col>
          </Row>
        <Row style={{"justify-content": "center","align-items": "center"}}>
          <label htmlFor="material-switch" style={{'color': 'white', 'font-size': '1em'}}>
            <Switch
              checked={this.state.mobile.isShowingRecs}
              onChange={() => {this.setState({...this.state, mobile: {...this.state.mobile, isShowingRecs: !this.state.mobile.isShowingRecs}})}}
              onColor={rootStyles['secondaryColorRed']}
              onHandleColor={rootStyles['mainColorRed']}
              handleDiameter={30}
              uncheckedIcon={false}
              checkedIcon={false}
              boxShadow="0px 1px 5px rgba(0, 0, 0, 0.6)"
              activeBoxShadow="0px 0px 1px 10px rgba(0, 0, 0, 0.2)"
              height={20}
              width={48}
              className="react-switch"
              id="material-switch"
            />
          <div style={{'height': '20px', "justify-content": "center","align-items": "center", 'fontStyle': 'italic'}}>Recommendations</div>
          </label>
        </Row>
        </Container>
        <Col xs={12} style={{'padding-right': '34px', 'margin-bottom': '75px'}}>
          {animes}
        </Col>
      </Row>
    );
  }

  setIsLoading(isLoading, redirect) {
    //console.log('HomePageComponent, isLoading:', isLoading);
    this.setState({...this.state, 'isLoading': isLoading});

    if (redirect) {
      this.props.history.push('/');
      this.props.updateModalStatus('');
    }
  }

  incrementMobileListIndex(shouldIncrement) {
    if (!this.props.animeLists) return;

    ReactGA.event({
      category: 'Click',
      action: 'Mobile Next List',
      value: `shouldIncrement: ${shouldIncrement}, this.state.mobile.listIndex: ${this.state.mobile.listIndex}`
    });

    let newListIndex = this.state.mobile.listIndex + (shouldIncrement ? 1 : -1);
    if (newListIndex > -1 && newListIndex < this.props.animeLists.length) {
      this.setState({...this.state, 'mobile': {...this.state.mobile, 'listIndex': newListIndex}});
    }
  }

  loadLowerSection() {
    return (
      <div>
        <div className="d-none d-sm-none d-md-block">
          {this.desktopLowerSection()}
        </div>
        <div className="d-md-none d-lg-none d-xl-none">
          {this.mobileLowerSection()}
        </div>
      </div>
    );
  }

  loadModals() {
    return (
      <div>
        {/* WELCOME SECTION */}
        <Modal
        open={!this.props.cookies.get('welcomeScreenShown')} onClose={() => {this.props.cookies.set('welcomeScreenShown', true)}} center
        classNames={{
            transitionEnter: styles.transitionEnter,
            transitionEnterActive: styles.transitionEnterActive,
            transitionExit: styles.transitionExitActive,
            transitionExitActive: styles.transitionExitActive,
          }}
          animationDuration={1}
          styles={
            {
              'modal': {'width': '50vw', 'min-width': '300px', 'borderRadius': '10px', '-webkit-overflow-scrolling': 'touch',},
          }
        }>
          <WelcomeComponent openSearchWithText={this.openSearchWithText} cookies={this.props.cookies}/>
        </Modal>

        {/* AUTHENTICATION SECTION */}
        <Modal
        open={this.props.modalStatus == AUTHENICATION_MODAL_STATUS} onClose={() => {this.toggleAuth(true)}} center
        classNames={{
            transitionEnter: styles.transitionEnter,
            transitionEnterActive: styles.transitionEnterActive,
            transitionExit: styles.transitionExitActive,
            transitionExitActive: styles.transitionExitActive,
          }}
          animationDuration={1}
          styles={
            {
              'modal': {'width': '50vw', 'min-width': '300px', 'borderRadius': '10px', '-webkit-overflow-scrolling': 'touch',},
          }
        }>
          <AuthenticationComponent authAction={this.props.history.location.pathname} cookies={this.props.cookies}
            toggleAuth={this.toggleAuth} saveAllAnimeLists={this.props.saveAllAnimeLists}
            updateAuthStatus={this.props.updateAuthStatus} setIsLoading={this.setIsLoading}
            />
        </Modal>
        <Modal
        open={((this.props.modalStatus == AUTHENICATION_MODAL_STATUS) && this.state.isLoading)} onClose={() => {this.toggleAuth(true)}} center
          styles={
            {'modal': {
              'borderRadius': '10px', 'min-width': '50vw', '-webkit-overflow-scrolling': 'touch',
              'background-color': "#00000000"
            }}}>
          <LoadingSpinnerComponent isLoading={this.state.isLoading} multiplier={4} style={{'z-index': -1, 'position':'relative'}}/>
        </Modal>

        {/* SEARCH SECTION */}
        <Modal
        open={this.props.modalStatus == SEARCHING_MODAL_STATUS} onClose={this.toggleSearch} center
        classNames={{
            transitionEnter: styles.transitionEnter,
            transitionEnterActive: styles.transitionEnterActive,
            transitionExit: styles.transitionExitActive,
            transitionExitActive: styles.transitionExitActive,
          }}
          animationDuration={1}
          styles={
            {
              'modal': {'width': '50vw', 'min-width': '300px', 'background-color': 'black', 'borderRadius': '10px', "box-shadow": "0 0 2pt 1pt white", '-webkit-overflow-scrolling': 'touch',},
              'closeIcon': {'filter': 'brightness(0) invert(1)'},
          }
        }>
          <SearchComponent setCurrentAnime={this.setCurrentAnimeDescription} textToSearch={this.state.textToSearch}/>
        </Modal>

        {/* DESCRIPTION SECTION */}
        <Modal
        open={this.props.modalStatus == ANIME_DESCRIPTION_MODAL_STATUS} onClose={this.toggleAnimeDescription} center
        classNames={{
            transitionEnter: styles.transitionEnter,
            transitionEnterActive: styles.transitionEnterActive,
            transitionExit: styles.transitionExitActive,
            transitionExitActive: styles.transitionExitActive,
          }}
          animationDuration={1}
          styles={{'modal': {'borderRadius': '10px', 'min-width': '50vw', 'min-height': '85vh', '-webkit-overflow-scrolling': 'touch',}}}>
          <AnimeDescriptionComponent currentAnime={this.state.currentAnime} createList={this.createList} animeLists={this.props.animeLists} isLoading={this.state.isLoading} setIsLoading={this.setIsLoading}/>
        </Modal>

        <Modal
        open={(this.props.modalStatus == ANIME_DESCRIPTION_MODAL_STATUS) && this.state.isLoading} onClose={this.toggleAnimeDescription} center
          styles={
            {'modal': {
              'borderRadius': '10px', 'min-width': '50vw', 'min-height': '85vh', '-webkit-overflow-scrolling': 'touch',
              'background-color': "#00000000"
            }}}>
          <LoadingSpinnerComponent isLoading={this.state.isLoading} multiplier={4} style={{'z-index': -1, 'position':'relative'}}/>
        </Modal>

        {/* CREATE LIST SECTION */}
        <Modal
        open={this.props.modalStatus === CREATING_LIST_MODAL_STATUS} onClose={this.toggleCreateList} center
        classNames={{
            transitionEnter: styles.transitionEnter,
            transitionEnterActive: styles.transitionEnterActive,
            transitionExit: styles.transitionExitActive,
            transitionExitActive: styles.transitionExitActive,
          }}
          animationDuration={1}
          styles={{'modal': {'borderRadius': '10px', 'min-width': '50vw', '-webkit-overflow-scrolling': 'touch'}}}>
          <CreateListComponent createList={this.createList} currentAnime={this.state.currentAnime}/>
        </Modal>
        <Modal
        open={(this.props.modalStatus == CREATING_LIST_MODAL_STATUS) && this.state.isLoading} onClose={this.toggleCreateList} center
          styles={
            {'modal': {
              'borderRadius': '10px', 'min-width': '50vw', '-webkit-overflow-scrolling': 'touch',
              'background-color': "#00000000"
            }}}>
          <LoadingSpinnerComponent isLoading={this.state.isLoading} multiplier={4} style={{'z-index': -1, 'position':'relative'}}/>
        </Modal>
      </div>
    )
  }

  getAnimeLists() {
    const userId = this.props.cookies.get('userId');
    if (userId) {
      axios.get(
        'https://animexp-backend.herokuapp.com/user/' + userId + '/lists'
      ).then((response) => {
        this.props.saveAllAnimeLists(response.data['userAnimeList']);
      }).catch((err) => {
       //console.log('Err:', err);
      });
    }
  }

  setupNetworkCalls() {
    if (!this.props.mostPopularAnime) this.getMostPopularAnime();
    if (!this.props.animeLists) this.getAnimeLists();

    ReactGA.pageview(this.props.location['pathname'].toLowerCase());
    // console.log('process.env:', process.env['GA_TRACKING_ID'])
    // console.log('window.location.pathname + window.location.search:', window.location.pathname + window.location.search)
  }

  render() {

    const fakeAnimesTitles = [
      {title: "title 1", description: "description 1"},
      {title: "title 1", description: "description 1"},
      {title: "title 1", description: "description 1"},
      {title: "title 1", description: "description 1"},
      {title: "title 1", description: "description 1"},
    ]

    const fakeAnimeContents = [
      {title: 'My Hero Academia Season 3', posterImage: "https://s4.anilist.co/file/anilistcdn/media/anime/cover/medium/nx100166-TxwbUGculKAX.jpg", description: 'The third season of <i>Boku no Hero Academia'},
      {title: 'My Hero Academia Season 3', posterImage: "https://s4.anilist.co/file/anilistcdn/media/anime/cover/medium/nx100166-TxwbUGculKAX.jpg", description: 'The third season of <i>Boku no Hero Academia'},
      {title: 'My Hero Academia Season 3', posterImage: "https://s4.anilist.co/file/anilistcdn/media/anime/cover/medium/nx100166-TxwbUGculKAX.jpg", description: 'The third season of <i>Boku no Hero Academia'},
      {title: 'My Hero Academia Season 3', posterImage: "https://s4.anilist.co/file/anilistcdn/media/anime/cover/medium/nx100166-TxwbUGculKAX.jpg", description: 'The third season of <i>Boku no Hero Academia'},
      {title: 'My Hero Academia Season 3', posterImage: "https://s4.anilist.co/file/anilistcdn/media/anime/cover/medium/nx100166-TxwbUGculKAX.jpg", description: 'The third season of <i>Boku no Hero Academia'},
      {title: 'My Hero Academia Season 3', posterImage: "https://s4.anilist.co/file/anilistcdn/media/anime/cover/medium/nx100166-TxwbUGculKAX.jpg", description: 'The third season of <i>Boku no Hero Academia'},
      {title: 'My Hero Academia Season 3', posterImage: "https://s4.anilist.co/file/anilistcdn/media/anime/cover/medium/nx100166-TxwbUGculKAX.jpg", description: 'The third season of <i>Boku no Hero Academia'},
      {title: 'My Hero Academia Season 3', posterImage: "https://s4.anilist.co/file/anilistcdn/media/anime/cover/medium/nx100166-TxwbUGculKAX.jpg", description: 'The third season of <i>Boku no Hero Academia'},
      {title: 'My Hero Academia Season 3', posterImage: "https://s4.anilist.co/file/anilistcdn/media/anime/cover/medium/nx100166-TxwbUGculKAX.jpg", description: 'The third season of <i>Boku no Hero Academia'},
      {title: 'My Hero Academia Season 3', posterImage: "https://s4.anilist.co/file/anilistcdn/media/anime/cover/medium/nx100166-TxwbUGculKAX.jpg", description: 'The third season of <i>Boku no Hero Academia'},
      {title: 'My Hero Academia Season 3', posterImage: "https://s4.anilist.co/file/anilistcdn/media/anime/cover/medium/nx100166-TxwbUGculKAX.jpg", description: 'The third season of <i>Boku no Hero Academia'},
      {title: 'My Hero Academia Season 3', posterImage: "https://s4.anilist.co/file/anilistcdn/media/anime/cover/medium/nx100166-TxwbUGculKAX.jpg", description: 'The third season of <i>Boku no Hero Academia'},
      {title: 'My Hero Academia Season 3', posterImage: "https://s4.anilist.co/file/anilistcdn/media/anime/cover/medium/nx100166-TxwbUGculKAX.jpg", description: 'The third season of <i>Boku no Hero Academia'},
    ]

    this.setupNetworkCalls();
    return (
      <div className="container">
        {this.loadModals()}
        <div className='user-list-container'>
            <h2 style={{'color': '#C13A3A'}}>Your Anime List</h2>
            {this.displayUserList(fakeAnimesTitles)}
        </div>
        <div className='list-recommend-container'>
            <div className="selected-list-wrapper">
              <div className="selected-list-title">{this.state.recommendationSelected ? "Recommendations base on this list" : "All animes added in this list" }</div>
              <div id='display-alt-btn'>{this.state.recommendationSelected ? <div id='screen-alt-btn' onClick={() => this.setState({recommendationSelected: false})}>View List Anime</div> : <div id='screen-alt-btn' onClick={() => this.setState({recommendationSelected: true})}>View Recommendations</div>}</div>
            </div>
            <div className="selected-list-content">
              {this.displayListContent(fakeAnimeContents)}
            </div>
        </div>
      </div>

    );
  }

  displayListContent = (animes) => {
      // return(
      //   this.state.userListEmpty 
      //   ? this.state.recommendationSelected ? <AnimeDisplay anime={recommendations} /> : <AnimeDisplay anime={animes} />
      //   : <div>There is currently no list selected</div>
      // )

      const fakeAnimeRec = [
        {title: '5-toubun', posterImage: "https://s4.anilist.co/file/anilistcdn/media/anime/cover/medium/nx100166-TxwbUGculKAX.jpg", description: 'The third season of <i>Boku no Hero Academia'},
        {title: '5-toubun', posterImage: "https://s4.anilist.co/file/anilistcdn/media/anime/cover/medium/nx100166-TxwbUGculKAX.jpg", description: 'The third season of <i>Boku no Hero Academia'},
        {title: '5-toubun', posterImage: "https://s4.anilist.co/file/anilistcdn/media/anime/cover/medium/nx100166-TxwbUGculKAX.jpg", description: 'The third season of <i>Boku no Hero Academia'},
        {title: '5-toubun', posterImage: "https://s4.anilist.co/file/anilistcdn/media/anime/cover/medium/nx100166-TxwbUGculKAX.jpg", description: 'The third season of <i>Boku no Hero Academia'},
        {title: '5-toubun', posterImage: "https://s4.anilist.co/file/anilistcdn/media/anime/cover/medium/nx100166-TxwbUGculKAX.jpg", description: 'The third season of <i>Boku no Hero Academia'},
      ]

      return (
        this.state.userListEmpty
        ? <div>There is currently no list selected</div> 
        : this.state.recommendationSelected ? fakeAnimeRec.map((anime) => <AnimeDisplay anime={anime} />) : animes.map((anime) => <AnimeDisplay anime={anime} />)
      )
  }

  displayUserList = (userAnimeList) => {
    return (
      this.state.userListEmpty 
      ? <div className="empty-list-wrapper"><p style={{'fontSize': '1.3em'}}>You current do not have any list on your account. Click "Create" to make one</p><div className="userlist-create-btn">Create</div></div>
      : userAnimeList.map((anime) => {
        return <UserAnimeList userlist={anime} />
      })
    )
  }

}

const styles = {
  'anime-horizontal-scroll-row': {
    'padding-right': '0px',
    "justify-content": "center",
    "align-items": "center"
  },
  'container-for-horizontal-scroll-container': {
     "display": "flex", 'overflow-x': 'auto',
     '-webkit-overflow-scrolling': 'touch',
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
    'overflow-x': 'scroll',
    "width": "inline-flex",
    'flex-direction': "row",
    "min-height": "100px",
    '-webkit-overflow-scrolling': 'touch'
  },
  "horizontal-scroll-container-main": {
    "display": "flex",
    'overflow-x': 'scroll',
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


// Use selectors here
const mapStateToProps = state => ({
})
// const mapDispatchToProps = (dispatch) => {
//   return bindActionCreators(AnimeActions, dispatch);
// }
export default connect(mapStateToProps, {
  saveNewAnimeList, saveAllAnimeLists
})(HomePageComponent);
