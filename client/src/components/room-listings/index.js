import React from 'react';
import { Link } from 'react-router-dom';
import './room-listings.css';
import { Collection, CollectionItem } from 'react-materialize';
import FaCircle from 'react-icons/lib/fa/circle';
import FaTrash from 'react-icons/lib/fa/trash';

class RoomListings extends React.Component {

    getDeleteBtnText() {
      if (this.props.deleteMode) {
        return 'I\'m done!';
      }
      return 'Delete rooms';
    }

    getRoomsJsx() {
      return this.props.chatRooms.map((room, index) => {
        let names = room.participants.map(u => { 
          if (u.displayName === this.props.user.displayName) {
            return '';
          }
          return u.displayName;
        });
        names = names.filter(n => n !== '');
        const num = names.length > 0 ? names.length : 1;
        const displayNames = names.length > 0 ? names.join(', ') : 'Just me';
        if (this.props.deleteMode) {
          return (
            <CollectionItem className="chat-listing" key={index}>
              <span className='number'>{ num }</span>
              <span>{ displayNames }</span>
              <span className='trash-icon-wrap' onClick={e => this.props.sendDeleteRoom(e, room._id) }><FaTrash /></span>
            </CollectionItem>
          );
        }
        return ( 
          <Link to={`/profile/chat/${room._id}`} key={index}>
            <CollectionItem className="chat-listing">
              <span className='number'>{ num }</span>
              <span>{ displayNames }</span>
            </CollectionItem>
          </Link>
        )
      });
    }

    getHeaders() {
      if (this.props.chatRooms.length === 0 && this.props.user) {
        return (
        <li className='chat-room-title-container'>
          <h4>Welcome! You currently have no open conversations</h4>
        </li>
        );
      }
      if (this.props.currentRm && this.props.user) {
        return (
          <li>
            <ul>
              <li><h5><FaCircle /> {this.props.user.displayName}</h5></li>
              <li><h5>DIRECT MESSAGES</h5></li>
            </ul>
          </li>
        );
      }
      return (
        <li className='chat-room-title-container'>
          <h4>Chat Rooms</h4>
          <a className='delete-rooms' onClick={e => this.props.updateDeleteMode(e)}>{ this.getDeleteBtnText() }</a>
        </li>
      );
    }

    render() {
      return (
        <Collection className="chat-list">
          {this.getHeaders()}
          {this.getRoomsJsx()}
        </Collection>
      );
    }
}

export default RoomListings;