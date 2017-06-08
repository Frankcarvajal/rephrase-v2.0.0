import React, { Component } from 'react';
import './chat-message.css';

export default function ChatMessage(props) {

  return (
    <div className='message'>
      <h4>{props.userName}</h4>
      <p>{props.message}</p>
    </div>
  );

}