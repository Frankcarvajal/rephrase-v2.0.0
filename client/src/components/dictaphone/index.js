import React, { Component } from 'react';
import PropTypes from 'prop-types';
import SpeechRecognition from 'react-speech-recognition';
// import './output.css';

    const propTypes = {
        transcript: PropTypes.string,
        resetTranscript: PropTypes.func,
        browserSupportsSpeechRecognition: PropTypes.bool
    }
    

class Dictaphone extends Component {

  	render() {
    const { transcript, resetTranscript, browserSupportsSpeechRecognition } = this.props

    if (!browserSupportsSpeechRecognition) {
      return null
    }

    let savedTranscript = transcript

    return (
      <div>
        <button onClick={resetTranscript}>Reset</button>
        <span>{savedTranscript}</span>
      </div>
    )
  }
}

Dictaphone.propTypes = propTypes

export default SpeechRecognition(Dictaphone)