import React, { Component } from 'react';
// import ChatMessage from '../chat-message'
import { connect } from 'react-redux';
import './chat-room.css';
import io from 'socket.io-client';
import * as Cookies from 'js-cookie'; 
import { fetchChatList } from '../chats-list/actions';

export class ChatRoom extends Component {

  // write a method that loops over a user's given chats and renders all chat messages
  constructor(props) {

    super(props);

    this.state = {
      messages: []
    };

    this.accessToken = Cookies.get('accessToken');
  }

  getChatRoomStateFromDb() {
    return fetch(`/api/chat/chatRoom/${this.props.match.params.roomId}`, {
      method: 'GET',
      headers: { 
			'Authorization': `Bearer ${this.accessToken}` 
		  }
    })
    .then(responseStream => responseStream.json())
    .catch(err => console.error(err));
  }

  componentDidMount() {
    const currentRm = this.props.match.params.roomId;
    this.socket.emit('join room', { roomId: currentRm });
    this.getChatRoomStateFromDb()
      .then(room => this.updateStateWithMessages(room.messages, this));
  }

  componentWillReceiveProps(nextProps) {
    console.log('componentWillReceiveProps');
    if (nextProps.user && !this.props.user) {
      console.log('fetching chat list from componentWillReceiveProps');
      this.props.dispatch(fetchChatList(nextProps.user.id, this.accessToken));
    }
  }

  componentWillMount() {
    this.socket = io(); 
    const currentRoom = this;
    this.socket.on('receive new message', function(roomMessages) {
      currentRoom.updateStateWithMessages(roomMessages, currentRoom);
    });
  }

  updateStateWithMessages(roomMessages, context) {
    context.setState({
      messages: roomMessages
    });
  }

  componentWillUnmount() {
    this.socket.emit('leave room', { roomId: this.props.match.params.roomId });
  }

  sendMessageToRoom(event) {
    event.preventDefault();
    const msg = this.input.value.trim();
    this.input.value = '';
    this.socket.emit('new message', { 
      roomId: this.props.match.params.roomId, 
      msgData: { createdBy: this.props.user.id, body: msg }
    });
  }

  insertMessagesDom() {
    if (this.props.user) {
      return this.state.messages.map((msg, index) => <li key={index}><b>{msg.createdBy}: &emsp;</b>{msg.body}</li>);
    }
  }

  render() {
    return (
      <div className='room'>
        <h2>{`You are in the Room ${this.props.match.params.roomId}`}</h2>
        <h2>Messages shall come forth here</h2>
        <ul id="messages">
          {this.insertMessagesDom()}
        </ul>
        <form action="">
          <input id="m" placeholder='Enter new message here' ref={input => this.input = input} />
          <button onClick={ e => this.sendMessageToRoom(e) }>Send</button>
        </form> 
      </div>
    );
  }
}

const mapStateToProps = state => ({
  user: state.userData.user,
  chatRooms: state.chat.chatRooms
});

export default connect(mapStateToProps)(ChatRoom);