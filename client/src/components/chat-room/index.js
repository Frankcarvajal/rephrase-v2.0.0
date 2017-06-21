import React, { Component } from 'react';
// import ChatMessage from '../chat-message'
import { connect } from 'react-redux';
import './chat-room.css';
import io from 'socket.io-client';
import * as Cookies from 'js-cookie'; 
import { fetchChatList } from '../chats-list/actions';
import LanguageChoice from '../language-choice';
import RoomListings from '../room-listings';
import { Row, Input, Button } from 'react-materialize';

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

    getMessageTranslations(messages, props) {
      return fetch(`/api/translate/messages`, {
        method: 'POST',
        headers: { 
			    'Authorization': `Bearer ${this.accessToken}`,
          'Accept': 'application/json, text/plain, */*',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ 
          defaultLanguage: props.user.defaultLanguage, 
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
        return this.getMessageTranslations(_room.messages, this.props);
      })
      .then(translations => {
        console.log('Comp mounts and you get translations here =>', translations);
        this.updateStateWithMessages(room, translations, this); 
      })
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.user && !this.props.user) {
      this.props.dispatch(fetchChatList(nextProps.user.id, this.accessToken));
    }
    if (this.props.user) {
      if (nextProps.user.defaultLanguage !== this.props.user.defaultLanguage) {
        this.getMessageTranslations(this.state.room.messages, nextProps)
          .then(translations => {
            this.updateStateWithMessages(this.state.room, translations, this);
          });
      }
    }
  }

  componentWillMount() {
    this.socket = io(); 
    const cr = this;
    this.socket.on('receive new message', function(updatedRoom) {
      const newestMsg = updatedRoom.messages[updatedRoom.messages.length - 1];
      return cr.getMessageTranslations([newestMsg], cr.props)
        .then(translation => {
          cr.updateStateWithMessages(updatedRoom, translation, cr)
      });
    });
  }

  updateStateWithMessages(updatedRoom, translations, context) {
    // Add some conditional logic that will append a new translated 
    // msg onto the state.stranlsations array if a new msg comes in
  
    const t = this.state.translations;
    
    if (t && t[0].translatedTo === translations[0].translatedTo) {
      translations = [...t, ...translations];
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

  getChatRoomListings() {
    if (this.props.chatRooms && this.props.user) {
      return (<RoomListings chatRooms={this.props.chatRooms} user={this.props.user} />);
    }
    return null;
  }

  render() {
    return (
      <div className='chat-room-wrapper'>
        { this.getChatRoomListings() }
        <div className='room'>
          <div className='room-header'>
            <LanguageChoice forDictaphone={false} />
            { this.showParticipants() }
          </div>
          {/*<h2>Messages shall come forth here</h2>*/}
          <ul id="messages">
            {this.insertMessagesDom()}
          </ul>
          <Row action="">
            <input label="message" id="m" placeholder='Enter new message here' ref={input => this.input = input} />
            <Button waves='light'onClick={ e => this.sendMessageToRoom(e) }>Send</Button>
          </Row> 
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  user: state.userData.user,
  chatRooms: state.chat.chatRooms
});

export default connect(mapStateToProps)(ChatRoom);