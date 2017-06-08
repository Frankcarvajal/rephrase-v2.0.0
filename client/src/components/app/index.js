import React, { Component } from 'react';
import { connect } from 'react-redux';
import { toggleBtn } from './actions';

import Header from '../header';
import Dictaphone from '../dictaphone';
import './app.css';

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
        {this.handleSpeechRecognition()}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  speechRecognitionOn: state.speech.speechRecognitionOn
});

export default connect(mapStateToProps)(App);
