import React, { Component } from 'react';
import './profile.css';
import LanguageChoice from '../language-choice'
import { connect } from 'react-redux';

export class Profile extends Component {
    render() {
        return (
          <div className='profile-view'>
            <h1>Profile View</h1>
            <p>User profile goes here</p>
            <h2>Defualt Language</h2>
            <LanguageChoice forDictaphone={false} />
          </div>
        );
    }
}


const mapStateToProps = state => ({

})
export default connect(mapStateToProps)(Profile);