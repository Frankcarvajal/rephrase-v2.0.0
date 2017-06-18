import React, { Component } from 'react';
// import ChatMessage from '../chat-message'
import { connect } from 'react-redux';
import './chat-room.css';
import io from 'socket.io-client';
import * as Cookies from 'js-cookie'; 
import { fetchChatList } from '../chats-list/actions';

export class ChatRoom extends Component {

  constructor(props) {

    super(props);

    this.state = {
      // this needs to be updated with all room data. everything changed here and 
      // change to just current room, for which you get the messages from there.
      messages: [], // we store the all rm messages locally
      participants: [] 
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
    if (this.props.user && this.props.chatRooms.indexOf(currentRm) < 0) {
      this.props.dispatch(fetchChatList(this.props.user.id, this.accessToken));
    }
    this.socket.emit('join room', { roomId: currentRm });
    this.getChatRoomStateFromDb()
      .then(room => { 
        this.updateStateWithMessages(room.messages, this); 
      });
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.user && !this.props.user) {
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

  showParticipants() {
    const currentRoom = this.props.chatRooms.filter(room => room._id === this.props.match.params.roomId);
    // return currentRoom[0].participants.filter(user => )
  }

  render() {
    return (
      <div className='room'>
        <div className='room-header'>
          { this.showParticipants() }
        </div>
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