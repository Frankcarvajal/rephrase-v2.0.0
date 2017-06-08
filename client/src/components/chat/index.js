import React, { Component } from 'react';
import ChatMessage from '../chat-message'
import './chat.css';

export default class Chat extends Component {

  // write a method that loops over a user's given chats and renders all chat messages

  render() {
    return (
      <div className='chat-view'>
        <ul className='user-list'>
          <li>User 1</li>
          <li>User 2</li>  
        </ul>
        <div className='message-container'>
          <ChatMessage userName={'Peter'} message={'chat component set up is complete!'} />
        </div>
      </div>
    );
  }

}

