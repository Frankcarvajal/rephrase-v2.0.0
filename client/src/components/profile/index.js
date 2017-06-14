import React, { Component } from 'react';
import Header from '../header';
import './profile.css';

export class Profile extends Component {
    render() {
        return (
          <div className='profile-view'>
            <h1>Profile View</h1>
            <p>A list of all chats for the current user should be visible here</p>
            <p>Clicking on a chat should link to <code>/profile/chat</code></p>
          </div>
        );
    }
}



export default Profile;