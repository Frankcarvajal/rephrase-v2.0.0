import React, { Component } from 'react';
import { connect } from 'react-redux';
import { toggleBtn } from './actions';

import Header from '../header';
import LanguageChoice from '../language-choice';
import EditButton from '../edit-btn';
import './App.css';
import Dictaphone from '../dictaphone';


class App extends Component {

  toggleSpeechRecognition() {
    this.props.dispatch(toggleBtn());
  }

  handleSpeechRecognition() {
    if (this.props.speechRecognitionOn) {
      return (<Dictaphone />);
    }
    else {
      return (
        <button onClick={(e) => this.toggleSpeechRecognition()}>Start Transcription</button>
      );
    }
  }

  render() {
    return (
      <div className="app">
      
        <Header />
        <LanguageChoice />
        <form className="translate">
          <input className="userText" />
            
          <EditButton />
        </form>
          <hr/>
          <div className="translaton">
            <p>Translation Goes here</p>
          </div>
    
        <button className="speak"><i className="fa fa-microphone" aria-hidden="true"></i></button>

        {this.handleSpeechRecognition()}

      </div>
 
    );
  }
}

const mapStateToProps = state => ({
  speechRecognitionOn: state.speech.speechRecognitionOn
});

export default connect(mapStateToProps)(App);
