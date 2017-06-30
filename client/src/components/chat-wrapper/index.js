import React, { Component } from 'react';
import RoomListings from '../room-listings';
import ChatRoom from '../chat-room';
import * as Cookies from 'js-cookie'; 
import windowSize from 'react-window-size';

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

  // evalWindowSize() {
  //   if (this.props.windowWidth < 900) {

  //   }
  // }

  render() {
    if (!this.state.roomId || !this.props.chatRooms || !this.props.user) {
      return (<p>Loading...</p>);
    }
    return (
      <div className='chat-room-wrapper'>
        <div className='sidebar-container'>
          <RoomListings chatRooms={this.props.chatRooms} 
            user={this.props.user} 
            currentRm={this.state.roomId} 
          />
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