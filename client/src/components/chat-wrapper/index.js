import React, { Component } from 'react';
import RoomListings from '../room-listings';
import ChatRoom from '../chat-room';
import * as Cookies from 'js-cookie'; 
import { Link } from 'react-router-dom';
import windowSize from 'react-window-size';
import FaCircle from 'react-icons/lib/fa/circle';

import { connect } from 'react-redux';
import { fetchChatList } from '../chats-list/actions';
import './chat-wrapper.css';

export class ChatWrapper extends Component {

  constructor(props) {
    super(props);

    this.state = {
      roomId: null
    };

    this.accessToken = Cookies.get('accessToken');
  }

  updateRoomId(roomId) {
    this.setState({
      roomId 
    });
  }

  componentDidMount() {
    if (this.props.match.params.roomId) {
      this.updateRoomId(this.props.match.params.roomId);
    }
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.match.params.roomId !== nextProps.match.params.roomId) {
      this.updateRoomId(nextProps.match.params.roomId);
    }
    if (nextProps.user && !this.props.user) {
      this.props.dispatch(fetchChatList(nextProps.user.id, this.accessToken));
    }
  }

  evalWindowSize() {
    if (this.props.windowWidth < 900) {
      return (
        <ul className='mobile-options'>
          <li><FaCircle /> <span className='user-name'>{this.props.user.displayName}</span></li>
          <li className='mobile-link-option'><div><Link to='/profile/chatlist'>GO TO ANOTHER ROOM</Link></div></li>
          <li className='mobile-link-option'><div><Link to='/profile'>CHANGE MY DEFAULT LANGUAGE</Link></div></li>
        </ul>
      );
    }
    return (
      <RoomListings 
        chatRooms={this.props.chatRooms} 
        user={this.props.user} 
        currentRm={this.state.roomId} 
      />
    );
  }

  render() {
    if (!this.state.roomId || !this.props.chatRooms || !this.props.user) {
      return (<p>Loading...</p>);
    }
    return (
      <div className='chat-room-wrapper'>
        <div className='sidebar-container'>
          { this.evalWindowSize() }
        </div>
        <ChatRoom roomId={this.state.roomId} key={this.state.roomId} />
      </div>
    );
  }

}

const mapStateToProps = state => ({
  user: state.userData.user,
  chatRooms: state.chat.chatRooms
});

export default connect(mapStateToProps)(windowSize(ChatWrapper));