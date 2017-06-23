import React, { Component } from 'react';
import Header from '../header';
import './profile.css';
import LanguageChoice from '../language-choice'
import { connect } from 'react-redux';
import * as Cookies from 'js-cookie';

export class Profile extends Component {
    render() {
        return (
          <div className='profile-view'>
            <h3>Profile View</h3>
            <p>User profile goes here</p>
            <h4>Defualt Language</h4>
            <LanguageChoice forDictaphone={false} />
          </div>
        );
    }
}


const mapStateToProps = state => ({

})
export default connect(mapStateToProps)(Profile);