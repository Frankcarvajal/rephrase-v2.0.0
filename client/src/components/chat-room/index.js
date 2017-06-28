import React, { Component } from 'react';
import { connect } from 'react-redux';
import './chat-room.css';
import io from 'socket.io-client';
import * as Cookies from 'js-cookie'; 
import { fetchChatList } from '../chats-list/actions';
import LanguageChoice from '../language-choice';

import { Row, Button } from 'react-materialize';
import { getMessageTranslations, getChatRoomStateFromDb } from './helpers';
import FaUser from 'react-icons/lib/fa/user';

export class ChatRoom extends Component {

  constructor(props) {

    super(props);

    this.state = {
      room: null
    };

    this.accessToken = Cookies.get('accessToken');
  }

  retrieveAndSetRoomState(currentRmId, defaultLanguage) {
    let room;
    this.socket.emit('join room', { roomId: currentRmId });
    getChatRoomStateFromDb(currentRmId, this.accessToken)
      .then(_room => {
        // invoke function to get all translations
        room = _room;
        return getMessageTranslations(_room.messages, defaultLanguage, this.accessToken);
      })
      .then(translatedMsgData=> {
        this.updateStateWithMessages(room, translatedMsgData, this); 
      })
      .catch(err => console.error(err));
  }

  componentDidMount() {
    if (this.props.user) {
      const currentRm = this.props.roomId;
      const userDefaultLang = this.props.user.defaultLanguage;
      this.retrieveAndSetRoomState(currentRm, userDefaultLang);
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.user && !this.props.user) {
      this.props.dispatch(fetchChatList(nextProps.user.id, this.accessToken));
    }
    if (this.props.user) {
      const nextDefault = nextProps.user.defaultLanguage;
      if (nextDefault !== this.props.user.defaultLanguage) {
        getMessageTranslations(this.state.room.messages, nextDefault, this.accessToken)
          .then(translatedMsgData => {
            this.updateStateWithMessages(this.state.room, translatedMsgData, this);
          });
      }
    }
  }

  componentWillMount() {
    this.socket = io(); 
    const cr = this;
    this.socket.on('receive new message', function(updatedRoom) {
      const newestMsg = updatedRoom.messages[updatedRoom.messages.length - 1];
      return getMessageTranslations([newestMsg], cr.props.user.defaultLanguage, this.accessToken)
        .then(translationData => {
          cr.updateStateWithMessages(cr.state.room, translationData, cr, updatedRoom.messages)
      });
    });
  }

  componentWillUnmount() {
    this.socket.emit('leave room', { roomId: this.props.roomId });
  }

  updateStateWithMessages(updatedRoom, translatedMessagesArr, context, roomMessages) {

    let isNewDefaultLanguage = false;
    if (translatedMessagesArr.length > 0 && updatedRoom.messages.length > 0) { 
      isNewDefaultLanguage = updatedRoom.messages[0].translatedTo !== translatedMessagesArr[0].translatedTo;
    }

    const noMessages = updatedRoom.messages.length === 0;

    if (!this.state.room || noMessages || isNewDefaultLanguage) {
      updatedRoom = Object.assign({}, updatedRoom, {
        messages: translatedMessagesArr
      });
    }

    if (this.state.room && translatedMessagesArr.length === 1 && !noMessages && !isNewDefaultLanguage) {
      // Test to see if we want to drop the very first message 
      if (updatedRoom.messages[0]._id !== roomMessages[0]._id) {
        updatedRoom.messages.shift();
      }
      updatedRoom = Object.assign({}, updatedRoom, {
        messages: [...updatedRoom.messages, ...translatedMessagesArr]
      });
    }

    context.setState({
      room: updatedRoom
    });

  }

  sendMessageToRoom(event) {
    event.preventDefault();
    const msg = this.input.value.trim();
    if ( msg.length > 0 ) {
      this.input.value = '';
      this.socket.emit('new message', { 
        roomId: this.props.roomId, 
        msgData: { createdBy: this.props.user.id, body: msg }
      });
    }
  }

  insertMessagesDom() {
    if (this.state.room && this.props.user) {
      return this.state.room.messages.map((msg, index) => {
        return ( 
          <li key={index}>
            <b>{msg.createdBy.displayName}: &emsp;</b>
            {msg.translatedText}
          </li>
        );
      });
    }
  }

  showParticipants() {
    if (!this.state.room || !this.props.user) {
      return;
    }
    let participants = this.state.room.participants.map((person, index) => {
      if (person._id !== this.props.user.id) {
        return person.displayName;
      }
      return undefined;
    });
    participants = participants.filter(u => typeof u !== 'undefined');
    if (participants.length === 0) {
      return 'Just You';
    }
    return participants.join(', ');
  }

  getNumber() {
    if (!this.state.room || !this.props.user) {
      return;
    }
    return this.state.room.participants.length;
  }

  render() {
    return (
      <div className='room'>

        <div className='rm-flex-item'>
          <div className='room-header'>
            <h5><span><em>{ this.showParticipants() }</em></span></h5>
            <FaUser />
            <span> { this.getNumber() }</span>
          </div>
          <ul id="messages">
            {this.insertMessagesDom()}
          </ul>
          <Row action="">
            <form onSubmit={e => this.sendMessageToRoom(e)}>
              <input label="message" id="m" placeholder='Enter new message here' ref={input => this.input = input} />
              <Button type='submit' waves='light'>Send</Button>
            </form>
          </Row>
        </div>

        <div className='rm-flex-language'>
          <LanguageChoice forDictaphone={false} /> 
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