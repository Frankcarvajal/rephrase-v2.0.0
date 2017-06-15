import React, { Component } from 'react';
// import ChatMessage from '../chat-message'
import { connect } from 'react-redux';
import './chat-room.css';
import io from 'socket.io-client';


export class ChatRoom extends Component {

  // write a method that loops over a user's given chats and renders all chat messages
  constructor(props) {

    super(props);

    this.state = {
      messages: []
    };

  }

  getChatRoomStateFromDb() {
    return fetch(`/api/chat/chatRoom/${this.props.match.params.roomId}`, {
      method: 'GET'
    })
    .then(responseStream => responseStream.json())
    .catch(err => console.error(err));
  }

  componentDidMount() {
    console.log('connecting to room '+ this.props.match.params.roomId);
    this.socket.emit('join room', { roomId: this.props.match.params.roomId });
    this.getChatRoomStateFromDb()
      .then(room => this.updateStateWithMessages(room.messages, this));
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

  componentWillReceiveProps() {
    console.log('receiving new props.');
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
    return this.state.messages.map((msg, index) => <li key={index}>{msg.body}</li>);
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
          <input id="m" placeholder='Enter thine message here-ith' ref={input => this.input = input} /><button onClick={e => this.sendMessageToRoom(e)}>Send</button>
        </form> 
      </div>
    );
  }
}

const mapStateToProps = state => ({
  user: state.userData.user
});

export default connect(mapStateToProps)(ChatRoom);