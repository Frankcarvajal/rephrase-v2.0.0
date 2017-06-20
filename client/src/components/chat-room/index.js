import React, { Component } from 'react';
// import ChatMessage from '../chat-message'
import { connect } from 'react-redux';
import './chat-room.css';
import io from 'socket.io-client';
import * as Cookies from 'js-cookie'; 
import { fetchChatList } from '../chats-list/actions';
import LanguageChoice from '../language-choice';

export class ChatRoom extends Component {

  constructor(props) {

    super(props);

    this.state = {
      // this needs to be updated with all room data. everything changed here and 
      // change to just current room, for which you get the messages from there.
      room: null,
      translations: null 
    };

    this.accessToken = Cookies.get('accessToken');
  }

    getMessageTranslations(messages) {
      return fetch(`/api/translate/messages`, {
        method: 'POST',
        headers: { 
			    'Authorization': `Bearer ${this.accessToken}`,
          'Accept': 'application/json, text/plain, */*',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ 
          defaultLanguage: this.props.user.defaultLanguage, 
          messages 
        }) 
      })
      .then(responseStream => responseStream.json())
      .catch(err => console.error(err));
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
    // if (this.props.user && this.props.chatRooms.indexOf(currentRm) < 0) {
    //   this.props.dispatch(fetchChatList(this.props.user.id, this.accessToken));
    // }
    let room;
    this.socket.emit('join room', { roomId: currentRm });
    this.getChatRoomStateFromDb()
      .then(_room => {
        // invoke function to get all translations
        room = _room;
        return this.getMessageTranslations(_room.messages);
      })
      .then(translations => {
        this.updateStateWithMessages(room, translations, this); 
      })
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.user && !this.props.user) {
      this.props.dispatch(fetchChatList(nextProps.user.id, this.accessToken));
    }
  }

  componentWillMount() {
    this.socket = io(); 
    const cr = this;
    this.socket.on('receive new message', function(updatedRoom) {
      console.log(updatedRoom);
      const m = updatedRoom.messages;
      return cr.getMessageTranslations([m[m.length-1]])
        .then(translation => {
          cr.updateStateWithMessages(updatedRoom, translation, cr)
      })
    })
  }

  updateStateWithMessages(updatedRoom, translations, context) {
    // Add some conditional logic that will append a new translated 
    // msg onto the state.stranlsations array if a new msg comes in
    if (this.state.translations) {
      translations = [...this.state.translations, ...translations]
    }
    context.setState({
      room: updatedRoom,
      translations
    });
  }

  componentWillUnmount() {
    this.socket.emit('leave room', { roomId: this.props.match.params.roomId });
  }

  sendMessageToRoom(event) {
    event.preventDefault();
    console.log(this.props.user.id);
    const msg = this.input.value.trim();
    this.input.value = '';
    this.socket.emit('new message', { 
      roomId: this.props.match.params.roomId, 
      msgData: { createdBy: this.props.user.id, body: msg }
    });
  }

  findUserName(i) {
    if (this.state.room.messages[i].createdBy) {
      return this.state.room.messages[i].createdBy.displayName;
    }
  }

  insertMessagesDom() {
    if (this.state.translations && this.props.user) {
      return this.state.translations.map((msg, index) => <li key={index}><b>{this.findUserName(index)}: &emsp;</b>{msg.translatedText}</li>);
    }
  }

  showParticipants() {
    if (!this.state.room || !this.props.user) {
      return;
    }
    return this.state.room.participants.map((person, index) => {
      if (person._id !== this.props.user.id)
        return (
          <h4 key={index}>{person.displayName}</h4>
        );
    });
  }

  render() {
    return (
      <div className='room'>
        <div className='room-header'>
          <LanguageChoice forDictaphone={false} />
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