import React, { Component } from 'react';
import './profile.css';
import LanguageChoice from '../language-choice'
import { connect } from 'react-redux';
import options from '../language-choice/options';

export class Profile extends Component {

  getDisplayName() {
    if (this.props.user) {
      return `${this.props.user.displayName}'s Profile`;
    }
  }

  getCurrentLanguage() {
   for (let i=0; i<options.length; i++) {
     if (options[i].value === this.props.user.defaultLanguage) {
       return options[i].name;
     }
   }
  }

  render() {
    if (!this.props.user) {
      return (<p>Loading...</p>);
    }
    return (
      <div className='profile-view'>
        <h3>{this.getDisplayName()}</h3>
        <h4>Your default display language is currently set to:</h4>
        <h4>{this.getCurrentLanguage()}</h4>
        <p><em>Translate your chats into any of the following languages</em></p>
        <div>
          <LanguageChoice forDictaphone={false} forProfile={true} />
        </div>
      </div>
    );
  }
}


const mapStateToProps = state => ({
  user: state.userData.user
});

export default connect(mapStateToProps)(Profile);