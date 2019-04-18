import React, { Component } from 'react';
import './Home.css';
import {rootStyles, baseAPI} from '../../../App'
import axios from 'axios';
import AnimeDisplayComponent from './animeDisplay';

const message = [
    "Browse Anime",
    "Customized accurate recommendation",
    "Look at lolies",
    "Go to another world"
]

class Home extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            messageIndex: 0,
            data: []
         }
    }

    componentDidMount() {
        this.timeout = setInterval(() => {
          let currentIdx = this.state.messageIndex;
          this.setState({ messageIndex: currentIdx + 1 });
        }, 3000);
        this.getMostPopularAnime()
    }

    componentWillUnmount() {
        clearInterval(this.timeout);
    }

    getMostPopularAnime = async () => {
        let route = baseAPI + '/popular/anime/v1'
        const data = await axios.get(route).then((response) => {
          let data = response.data
          let popular_animes_array = []
          data.forEach((anime) => {
            try {
              popular_animes_array.push({
                'id': anime['animeId'],
                'slug': anime['animeSlug'],
                'title': anime['animeTitles'][0],
                'coverImage': anime['animeCoverImg'],
                'posterImage': anime['animePicUrl'],
                'description': anime['animeSynopsis']
              })
            } catch (e) {
              console.log(e)
            }
          })
          return popular_animes_array
        // that.props.saveMostPopularAnime(popular_animes_array)
        }).catch((error) => {
          console.log(error)
        })
        // console.log(data)
        this.setState({data: data})
    }

    render() {
        const animeToDisplay = this.state.data[Math.floor(Math.random() * this.state.data.length)]
        let messageToDisplay = message[this.state.messageIndex % message.length];
        return ( 
            <div className="home-container">

                <div className="animebrand-text">
                    <a>Anime</a><a style={{'color': '#C13A3A'}}>XP</a>
                </div>
                <div className="carousel-text">
                    {messageToDisplay}
                </div>

                <div className="anime-display">
                  {animeToDisplay 
                    ? <AnimeDisplayComponent anime={animeToDisplay} />
                    : ''
                  }
                </div>

            </div>
         );
    }
}
 
export default Home;