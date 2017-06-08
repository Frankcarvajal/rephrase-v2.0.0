import React, { Component } from 'react';
import PropTypes from 'prop-types';
import SpeechRecognition from 'react-speech-recognition';
import { postTranscriptGetTranslation } from './actions';
// import './output.css';

    const propTypes = {
        transcript: PropTypes.string,
        resetTranscript: PropTypes.func,
        browserSupportsSpeechRecognition: PropTypes.bool
    }
    
class Dictaphone extends Component {


  	render() {
    const { transcript, resetTranscript, browserSupportsSpeechRecognition } = this.props

    const sendTranscriptToServer = transcript => {
      this.props.dispatch(postTranscriptGetTranslation(transcript))
      resetTranscript(); 
    }


    if (!browserSupportsSpeechRecognition) {
      return null
    }

    let savedTranscript = transcript;

    return (
      <div>
        <button onClick={(e) => sendTranscriptToServer(savedTranscript)}>End Transcrition and get translation</button>
        <span>{savedTranscript}</span>
      </div>
    )
  }
}

Dictaphone.propTypes = propTypes;

export default SpeechRecognition(Dictaphone);

