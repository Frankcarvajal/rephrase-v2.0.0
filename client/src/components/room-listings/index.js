import React from 'react';
import { Link } from 'react-router-dom';
import './room-listings.css';

export default function RoomListings(props) {

    const roomsJsx = props.chatRooms.map((room, index) => {
      const names = room.participants.map(u => { 
        if (u.displayName === props.user.displayName) {
          return null;
        }
        return u.displayName;
      });
      return ( 
        <Link to={`/profile/chat/${room._id}`} key={index}>
          <li className="chat-listing">
              <p>{ `Participants: ${names.join(' ')}` }</p>
              {/*<p>{ `RoomId: ${room._id}` }</p>*/}
          </li>
        </Link>
      )
    });

    return (
      <ul className="chat-list">
        {roomsJsx}
      </ul>
    );

  }