import React, { Component }  from 'react';
import './UserAnimeList.css'

const UserAnimeList = (props) => {
    console.log(props)
    return ( 
        <li className="userList-title-container" style={{'color': 'aliceblue', 'fontSize': '1.2em'}}>
            {props.userlist.title}
        </li>
     );
}
 
export default UserAnimeList;