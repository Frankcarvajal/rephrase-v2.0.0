import React, { Component } from 'react';
import { connect } from 'react-redux';
import './chat-room.css';
import io from 'socket.io-client';
import * as Cookies from 'js-cookie'; 
import { fetchChatList } from '../chats-list/actions';
import LanguageChoice from '../language-choice';
import RoomListings from '../room-listings';
import { Row, Input, Button } from 'react-materialize';
import { getMessageTranslations, getChatRoomStateFromDb } from './helpers';

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
      const currentRm = this.props.match.params.roomId;
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
    this.socket.emit('leave room', { roomId: this.props.match.params.roomId });
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

    if (this.state.room && translatedMessagesArr.length === 1 && !noMessages) {
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
        roomId: this.props.match.params.roomId, 
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