import React, { Component } from 'react';
import './Home.css';


class Home extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            message: ""
         }
    }

    render() {
        console.log(this.changeHomeText)
        return ( 
            <div className="home-container">

                <div>
                    AnimeXP
                </div>
                <div>
                    {this.state.message}
                </div>

            </div>
         );
    }
}
 
export default Home;