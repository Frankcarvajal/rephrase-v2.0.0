import React, { Component } from 'react';
import Header from '../header';
import Dictaphone from '../dictaphone';
import SpeechRecognition from 'react-speech-recognition';
import './App.css';

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      speechRecognitionOn: false
    };
  }

  toggleRecognition() {
    this.setState({
      speechRecognitionOn: !this.state.speechRecognitionOn
    });
  }

  handleSpeechRecognition() {
    if (this.state.speechRecognitionOn) {
      return (<Dictaphone />);
    }
    else {
      return (
        <button onClick={(e) => this.toggleRecognition()}>Start Transcription</button>
      );
    }
  }

  render() {
    return (
      <div className="App">
        <Header />
        {this.handleSpeechRecognition()}
      </div>
    );
  }
}

export default App;
