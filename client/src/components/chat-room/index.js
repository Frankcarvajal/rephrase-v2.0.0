import React, { Component } from 'react';
// import ChatMessage from '../chat-message'
import './chat-room.css';
import io from 'socket.io-client';


export default class ChatRoom extends Component {

  // write a method that loops over a user's given chats and renders all chat messages
  constructor(props) {

    super(props);

    this.state = {
      messages: []
    };

  }

  componentWillMount() {
    this.socket = io(); 
    const currentRoom = this;
    this.socket.on('receive new message', function(msg) {
      console.log(msg);
      currentRoom.addMessageUpdateState(msg, currentRoom);
    });
  }

  componentWillUpdate() {
    console.log('Updating');
    console.log(this.state);
  }

  addMessageUpdateState(newMsg, context) {
    console.log('Updating state', newMsg);
    context.setState({
      messages: [...context.state.messages, newMsg]
    });
  }

  componentDidMount() {
    // socket.on('connect', function(connection) {
    console.log('connecting to room '+ this.props.match.params.roomId);
    this.socket.emit('join room', { roomId: this.props.match.params.roomId });
    // });
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
    this.socket.emit('new message', { msg, roomId: this.props.match.params.roomId });
  }

  insertMessagesDom() {
    return this.state.messages.map((msg, index) => <li key={index}>{msg}</li>)
  }

  render() {
    
    console.log(this.state.messages);

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