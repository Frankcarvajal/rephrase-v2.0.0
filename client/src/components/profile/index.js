import React, { Component } from 'react';
import './profile.css';
import LanguageChoice from '../language-choice'
import { connect } from 'react-redux';

export class Profile extends Component {

  getDisplayName() {
    if (this.props.user) {
      return `${this.props.user.displayName}'s Profile`;
    }
  }

  render() {
    return (
      <div className='profile-view'>
        <h3>{this.getDisplayName()}</h3>
        <h4>Set your default language</h4>
        <p><em>Translate your chats into any of the following languages</em></p>
        <LanguageChoice forDictaphone={false} />
      </div>
    );
  }
}


const mapStateToProps = state => ({
  user: state.userData.user
})
export default connect(mapStateToProps)(Profile);