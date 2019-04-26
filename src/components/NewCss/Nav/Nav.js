import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { withRouter } from 'react-router';
import { SEARCHING_MODAL_STATUS, AUTHENICATION_MODAL_STATUS, rootStyles, IS_AUTHENTICATED } from '../../../App.js'
import './Nav.css'

class Nav extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            isLogin: false
         }
    }

    logoutHandler = () => {
        return
    }

    loginhandler = () => {
        return
    }

    toggleSearch = (e) => {
        //console.log('Toggle search occurred')
        if (e) {
          e.stopPropagation();
          e.nativeEvent.stopImmediatePropagation();
          e.preventDefault()
        }
        this.props.history.push('/search')
        this.props.updateModalStatus(SEARCHING_MODAL_STATUS)
      }

    toggleAuth(e, isLogin) {
        if (e) {
          e.stopPropagation();
          e.nativeEvent.stopImmediatePropagation();
          e.preventDefault()
        }
        if (isLogin) {
          this.props.history.push('/login')
        } else {
          this.props.history.push('/register')
        }
        this.props.updateModalStatus(AUTHENICATION_MODAL_STATUS);
    }

    render() { 
        return ( 

            <div className= "nav-container">
                <div className="headers-wrapper">
                    <div id="animexp-brand" style={{'fontSize': '2em'}}>
                        <a onClick={() => {this.props.history.push('/')}}>Anime</a><a onClick={() => {this.props.history.push('/')}} style={{'color': '#C13A3A'}}>XP</a>
                    </div>
                    <div id="nav-links">
                        <a 
                            id="browse-link"
                            onClick={() => {this.props.history.push('/browse')}}>Browse</a>
                        <a 
                            id="recommend-link"
                            onClick={() => {this.props.history.push('/recommendation')}}>Recommendation</a>
                    </div>
                </div>

                <div className="searchbar-wrapper">
                    <form id="search-form">
                        <input 
                            id="search-input"
                            placeholder="Search AnimeXP"
                            onClick={(e) => { this.toggleSearch(e)}}
                        />
                    </form>
                </div>

                <div className="auth-wrapper">
                    {
                        this.state.isLogin 
                        ? (
                            <div className="logout-btn">
                                Logout
                            </div>
                        )
                        : (<div className="not-auth">
                            <div className="login-btn" onClick={(e) => {this.toggleAuth(e, true)}}>
                                Login
                            </div>
                            <div className="logout-btn" style={{'color': '#C13A3A'}} onClick={(e) => {this.toggleAuth(e, false)}}>
                                Register
                            </div>
                        </div>) 
                    }
                </div>
            </div>

         );
    }
}
 
export default Nav;