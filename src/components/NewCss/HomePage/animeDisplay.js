import React from 'react';
import './animeDisplay.css'

const AnimeDisplay = (props) => {
    console.log(props.anime.coverImage)
    return ( 
        <div className="anime-card">
            <img id="card-image" src={props.anime.posterImage} />
            <div id="card-title">{props.anime.title}</div>
            <div className="card-description"><p id="animecard-metadata">{props.anime.description}</p></div>
            <div className="overlay-description"></div>
        </div>
     );
}
 
export default AnimeDisplay;