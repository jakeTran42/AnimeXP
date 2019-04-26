import React, { Component } from 'react';
import './Browse.css'
import {baseAPI} from '../../../App'
import axios from 'axios';
import AnimeDisplayComponent from '../HomePage/animeDisplay'

import {UncontrolledDropdown, ButtonDropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';

class Browse extends Component {
    constructor(props) {
        super(props);
        this.state = {
            dropDownOpen: false, 
            searchByFilter: "Popular",
            currentSeason: "Spring",
            data: []
         }
    }

    componentDidMount() {
        this.getMostPopularAnime()
    }

    fetchSeasonAnime() {
        fetch(baseAPI + `/api/v0/seasonal/2018/${this.state.currentSeason.toLowerCase()}/info`)
        .then(response => response.json())
        // .then(data => this.setState({ data: data }))
        .then(data => console.log(data))
        .catch(error => this.setState({ error }));
    }

    getMostPopularAnime = async () => {
        let route = baseAPI + '/api/v1.0/popular/anime'
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
        }).catch((error) => {
          console.log(error)
        })
        this.setState({data: data})
    } 

    render() { 
        // this.fetchSeasonAnime()
        return ( 
            <div className="browse-container">
                <div className="browse-wrapper">
                    <div className="search-wrapper">
                        <div className="search-bar">
                            <svg id="search-icon" className="search-icon" viewBox="0 0 24 24">
                                <path d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"/>
                                <path d="M0 0h24v24H0z" fill="none"/>
                            </svg>
                            <input
                                className="search-input-browse" 
                                placeholder="Search anime by name.."
                            />
                        </div>
                    </div>
                    <div className="filter-wrapper">
                        <UncontrolledDropdown className="dropdown-filter">
                            <DropdownToggle caret>
                                {this.state.searchByFilter}
                            </DropdownToggle>

                            <DropdownMenu left>
                                <DropdownItem onClick={() => this.setState({searchByFilter: "Popular"})}>Popular</DropdownItem>

                                <DropdownItem divider />

                                <DropdownItem onClick={() => this.setState({searchByFilter: "Top Anime"})}>Top Anime</DropdownItem>

                                <DropdownItem divider />

                                <DropdownItem onClick={() => this.setState({searchByFilter: "Seasonal"})}>Seasonal</DropdownItem>
                            </DropdownMenu>
                            <div className="arrow-down"></div>
                        </UncontrolledDropdown>

                        {this.state.searchByFilter === ("Seasonal") 
                        ?   <div> 
                                <UncontrolledDropdown className="dropdown-filter">
                                    <DropdownToggle caret>
                                        {this.state.currentSeason}
                                    </DropdownToggle>

                                    <DropdownMenu left>
                                        <DropdownItem onClick={() => this.setState({currentSeason: "Spring"})}>Spring</DropdownItem>

                                        <DropdownItem divider />

                                        <DropdownItem onClick={() => this.setState({currentSeason: "Summer"})}>Summer</DropdownItem>

                                        <DropdownItem divider />

                                        <DropdownItem onClick={() => this.setState({currentSeason: "Fall"})}>Fall</DropdownItem>

                                        <DropdownItem divider />

                                        <DropdownItem onClick={() => this.setState({currentSeason: "Winter"})}>Winter</DropdownItem>
                                    </DropdownMenu>
                                    <div class="arrow-down"></div>
                                </UncontrolledDropdown>
                            </div>
                        : null}

                    </div>
                    <div className="anime-list-wrapper" style={{'overflow': 'scroll'}}>
                        {this.state.data 
                        ? this.state.data.map((anime) => {
                            return <AnimeDisplayComponent key={anime.title} anime={anime} />
                        })
                        : null}
                    </div>
                </div>
            </div>
         );
    }
}
 
export default Browse;