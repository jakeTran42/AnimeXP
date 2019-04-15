import React from 'react';
import './Home.css'

const AnimeDisplay = (props) => {
    console.log(props.anime.coverImage)
    return ( 
        <div className="anime-card">
            <img id="card-image" src={props.anime.posterImage} />
            <div id="card-title">{props.anime.title}</div>
        </div>
     );
}
 
export default AnimeDisplay;