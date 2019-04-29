import React, { Component } from 'react';
import { Collapse, Navbar, NavbarToggler, NavbarBrand, Nav, NavItem, NavLink } from 'reactstrap';
import { Media } from 'reactstrap';
import mag_glass_icon from '../../img/magnifying-glass-red.png'
import { Image, Container, Col, Row , Carousel } from 'react-bootstrap';
import { SEARCHING_MODAL_STATUS, AUTHENICATION_MODAL_STATUS, rootStyles, IS_AUTHENTICATED } from '../../App.js'

const API = 'http://localhost:5000/';

class NavbarComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {}

    this.toggleSearch = this.toggleSearch.bind(this)
    this.showAuthLinks = this.showAuthLinks.bind(this)
    this.toggleAuth = this.toggleAuth.bind(this)
  }

  toggleSearch(e) {
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
    //console.log('Toggle search occurred')
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

  showAuthLinks() {
    if (this.props.authStatus == IS_AUTHENTICATED) return (
      <a style={{"float": "right", "margin-left": "auto", "margin-right": '8px', 'margin-top': '10px'}}>
        <Image src={mag_glass_icon} style={{'height': '3vh', "max-height": "35px", 'min-height': "25px" }} onClick={(e) => { this.toggleSearch(e)}}/>
      </a>
    );

    return (
      <div style={{"margin-left": "auto"}}>
        <a style={{"float": "right", "margin-right": '8px', 'margin-top': '10px'}}>
          <Image src={mag_glass_icon} style={{'height': '3vh', "max-height": "35px", 'min-height': "25px" }} onClick={(e) => { this.toggleSearch(e)}}/>
        </a>
        <NavLink onClick={(e) => {this.toggleAuth(e, true)}} style={{"float": "right", "margin-right": '8px', 'margin-top': '10px', "color": rootStyles['secondaryColorRed'], "margin-right": '8px', 'margin-top': '10px', 'font-weight': 'bold', 'font-size': '1.2em'}}>Login</NavLink>
        <NavLink onClick={(e) => {this.toggleAuth(e, false)}} style={{"float": "right", 'margin-top': '10px', "color": rootStyles['secondaryColorRed'], 'margin-top': '10px', 'font-weight': 'bold', 'font-size': '1.2em'}}>Signup</NavLink>
      </div>
    );
  }

  render() {
    return (
      <div style={{'width': "100%"}}>
        <Navbar color="light" light expand="md" style={{'width': "100%"}}>
          <NavbarBrand href="/" style={{"color": "#8b0000", 'margin-top': '10px'}}><b>AnimeXP</b></NavbarBrand>
          {this.showAuthLinks()}
        </Navbar>
      </div>
    );
  }
}

export default NavbarComponent;
