import React, { Component } from 'react';
import { connect } from 'react-redux'
import { ConnectedRouter } from 'connected-react-router'
import { Route, Switch } from 'react-router'
import { bindActionCreators } from 'redux'
import ReactGA from 'react-ga';

import { Image, Container, Col, Row , Carousel } from 'react-bootstrap';
import axios from 'axios'
import { withCookies } from 'react-cookie';

import { onSaveMostPopularAnime, updateAllAnime, updateAnAnime } from './actions/AnimeActions';
import { onUpdateModalStatus, onUpdateAuthStatus } from './actions/GeneralActions';

import HomePageComponent from './components/HomePageComponent'
import AnimeDescriptionComponent from './components/small/AnimeDescriptionComponent'
import NavbarComponent from './components/small/NavbarComponent'

import Nav from './components/NewCss/Nav/Nav';
import Home from './components/NewCss/HomePage/Home'

import logo from './logo.svg';
import './App.css';

const ANIME_DESCRIPTION_MODAL_STATUS = 'isViewingAnimeDescription';
const SEARCHING_MODAL_STATUS = 'isSearching'
const CREATING_LIST_MODAL_STATUS = 'isCreatingList'
const AUTHENICATION_MODAL_STATUS = 'isAuthenticating';
const IS_AUTHENTICATED = "AUTHENTICATED";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      anime: {}
    }

    this.wakeUpServer = this.wakeUpServer.bind(this)

    this.wakeUpServer()
    // let d = new Date();
    // d.setTime(d.getTime() + (60*24*365)*60*1000) //Expires in one year
    // props.cookies.set('id', 123, { path: '/', expires: d});
    // this.onUpdateAnime = this.onUpdateAnime.bind(this);
    // this.onUpdateAnAnime = this.onUpdateAnAnime.bind(this);
    let gaOptions = {
      siteSpeedSampleRate: 100,
      standardImplementation: true
    }
    if (props.cookies.get('userId')) {
      if (props.cookies.get('registered')) {
        this.props.onUpdateAuthStatus(IS_AUTHENTICATED)
      }
      gaOptions['userId'] = props.cookies.get('userId')
    }
    ReactGA.initialize('UA-138825336-1', {
      debug: false,
      gaOptions: gaOptions
    });

  }

  onUpdateAnime() {
    // this.props.onUpdateAnime("Greek Wars");
  }
  onUpdateAnAnime() {
    // this.props.onUpdateAnAnime("Greek Wars");
  }

  wakeUpServer() {
    axios.get(baseAPI).then(response => {
      //console.log('Server woken up, response:', response)
    }).catch(err  => {
      //console.log('Error while waking up server:', err)
    })
  }


  render() {
    //console.log('This is apps props:', this.props)
    return (
      <div className="App" style={{'width': "100vw",}}>
        {/* <Container style={{"margin": 0, "padding": 0, 'width': '100%', 'height': "100%", "margin": 0}}> */}
          {/* <Row style={{'width': "100%", "height": "100%", 'margin': 0}}> */}
            {/* <NavbarComponent authStatus={this.props.general.authStatus} cookies={this.props.cookies} history={this.props.history} modalStatus={this.props.general.modalStatus} updateModalStatus={this.props.onUpdateModalStatus} style={{'width': "100%"}}/> */}
            <Nav authStatus={this.props.general.authStatus} cookies={this.props.cookies} history={this.props.history} modalStatus={this.props.general.modalStatus} updateModalStatus={this.props.onUpdateModalStatus} style={{'width': "100%"}}/>
            <ConnectedRouter history={this.props.history}>
              <Switch>
                <Route exact path="/" render={
                    (props) => {
                      return (
                      // <HomePageComponent {...props} updateAuthStatus={this.props.onUpdateAuthStatus} authStatus={this.props.general.authStatus} cookies={this.props.cookies} saveMostPopularAnime={this.props.onSaveMostPopularAnime} mostPopularAnime={this.props.anime.mostPopular} animeLists={this.props.anime.animeLists} modalStatus={this.props.general.modalStatus} updateModalStatus={this.props.onUpdateModalStatus}/>
                      <Home {...props} updateAuthStatus={this.props.onUpdateAuthStatus} authStatus={this.props.general.authStatus} cookies={this.props.cookies} saveMostPopularAnime={this.props.onSaveMostPopularAnime} mostPopularAnime={this.props.anime.mostPopular} animeLists={this.props.anime.animeLists} modalStatus={this.props.general.modalStatus} updateModalStatus={this.props.onUpdateModalStatus}/>
                      )
                    }
                  }
                />
                <Route path="/anime/:animeId" render={
                    (props) => {
                      return (<HomePageComponent {...props} updateAuthStatus={this.props.onUpdateAuthStatus} authStatus={this.props.general.authStatus} cookies={this.props.cookies} saveMostPopularAnime={this.props.onSaveMostPopularAnime} mostPopularAnime={this.props.anime.mostPopular} animeLists={this.props.anime.animeLists} modalStatus={this.props.general.modalStatus} updateModalStatus={this.props.onUpdateModalStatus}/>)
                    }
                  }
                />
                <Route path="/list/:listId" render={
                    (props) => {
                      return (<HomePageComponent {...props} updateAuthStatus={this.props.onUpdateAuthStatus} authStatus={this.props.general.authStatus} cookies={this.props.cookies} saveMostPopularAnime={this.props.onSaveMostPopularAnime} mostPopularAnime={this.props.anime.mostPopular} animeLists={this.props.anime.animeLists} modalStatus={this.props.general.modalStatus} updateModalStatus={this.props.updateModalStatus}/>)
                    }
                  }
                />
              <Route exact path="/:anythingelse" render={
                    (props) => {
                      return (<HomePageComponent {...props} updateAuthStatus={this.props.onUpdateAuthStatus} authStatus={this.props.general.authStatus} cookies={this.props.cookies} saveMostPopularAnime={this.props.onSaveMostPopularAnime} mostPopularAnime={this.props.anime.mostPopular} animeLists={this.props.anime.animeLists} modalStatus={this.props.general.modalStatus} updateModalStatus={this.props.onUpdateModalStatus}/>)
                    }
                  }
                />
              </Switch>
            </ConnectedRouter>
          {/* </Row> */}
        {/* </Container> */}
      </div>
    );
  }
}
const baseAPI = 'https://animexp-backend.herokuapp.com'

const rootStyles = {
  "mainColorRed": "#8b0000",
  "secondaryColorRed": "#8b002b"

}

//Use selectors here
const mapStateToProps = state => ({
  general: state.general,
  manga: state.manga,
  anime: state.anime
})

export {
  rootStyles, baseAPI, ANIME_DESCRIPTION_MODAL_STATUS, SEARCHING_MODAL_STATUS,
  CREATING_LIST_MODAL_STATUS, AUTHENICATION_MODAL_STATUS, IS_AUTHENTICATED
}
export default connect(mapStateToProps, {
  onSaveMostPopularAnime,
  onUpdateAuthStatus,
  onUpdateModalStatus,
  updateAllAnime,
  updateAnAnime
})(withCookies(App));
