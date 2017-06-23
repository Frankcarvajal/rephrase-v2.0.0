import React from 'react';
import { Link } from 'react-router-dom';
import './room-listings.css';
import { Collection, CollectionItem } from 'react-materialize';

class RoomListings extends React.Component {

    getRoomsJsx() {
      return this.props.chatRooms.map((room, index) => {
        const names = room.participants.map(u => { 
          if (u.displayName === this.props.user.displayName) {
            return null;
          }
          return u.displayName;
        });
        return ( 
          <Link to={`/profile/chat/${room._id}`} key={index}>
            <CollectionItem className="chat-listing">
                <p><span>Participants: </span> 
                { `${names.join(' ')}` }</p>
            </CollectionItem>
          </Link>
        )
      });
    }

    render() {
      return (
        <Collection className="chat-list">
          <h4>Rooms</h4>
          {this.getRoomsJsx()}
        </Collection>
      );
    }
}

export default RoomListings;