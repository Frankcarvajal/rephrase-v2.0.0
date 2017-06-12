import React, { Component } from 'react';
import { connect } from 'react-redux';
import {BrowserRouter as Router, Route, Redirect} from 'react-router-dom';

import Home from '../home';
import * as Cookies from 'js-cookie';
import { fetchUserData } from './actions';

export class App extends Component {

  componentDidMount() {
    const accessToken = Cookies.get('accessToken');
    if (accessToken) {
      // fetch user data and set it in state
      this.props.dispatch(fetchUserData(accessToken));
    }
  }

  render() {
    return (
      <Router>
        <div className="app">
            <Home /> 
        </div>
      </Router>
    );
  }
}

// const mapStateToProps = (state) => ({
//   speechRecognitionOn: state.speech.speechRecognitionOn,
//   speechText: state.basicTranslate,
//   translatedText: state.basicTranslate.translatedText,
//   isEditing: state.speech.isEditing,
//   userLanguage: state.selectedLanguage.userLanguage
// });

export default connect()(App);
