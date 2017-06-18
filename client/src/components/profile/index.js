import React, { Component } from 'react';
import './profile.css';
import LanguageChoice from '../language-choice'

export class Profile extends Component {
    updateDefaultLanguage(language){
      fetch('/api/users/me', {
        method: 'PUT'
      })
      .then(responseStream => responseStream.json(language))
    }
    render() {
        return (
          <div className='profile-view'>
            <h1>Profile View</h1>
            <p>User profile goes here</p>
            <h2>Defualt Language</h2>
            <LanguageChoice languageProp={(language) => this.updateDefaultLanguage(language)}/>
          </div>
        );
    }
}



export default Profile;