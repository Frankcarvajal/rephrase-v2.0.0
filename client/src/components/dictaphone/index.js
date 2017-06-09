import React, { Component } from 'react';
import PropTypes from 'prop-types';
import SpeechRecognition from 'react-speech-recognition';

import { connect } from 'react-redux';
import { postTranscriptGetTranslation } from './actions';
import { toggleBtn } from '../app/actions';
import './dictaphone.css';
import EditButton from '../edit-btn';

    const propTypes = {
        transcript: PropTypes.string,
        resetTranscript: PropTypes.func,
        browserSupportsSpeechRecognition: PropTypes.bool
    }
    
class Dictaphone extends Component {

  componentDidMount() {
    console.log('Dictaphone is mounting');
  }

  componentWillUnmount() {
    console.log('Dictaphone is being torn down');

  }

  componentWillReceiveProps() {
    console.log('Dictaphone will receive new props');
  }

  render() {
    const { transcript, resetTranscript, browserSupportsSpeechRecognition, recognition } = this.props

    if (!browserSupportsSpeechRecognition) {
      return null
    }

    const sendTranscriptToServer = transcript => {
      recognition.onend = function(e) { console.log('trancript:', e); }
      const final = transcript;
      resetTranscript();
      recognition.stop(); 
      this.props.dispatch(toggleBtn());
      this.props.dispatch(postTranscriptGetTranslation(final));
    }

    return (
      <div>
        <div>
          <button className="speak" onClick={(e) => sendTranscriptToServer(transcript)}>Stop</button>
          <EditButton className="edit" />
        </div>
        <div className="transcript">{transcript}</div>
      </div>
    )
  }

}

Dictaphone.propTypes = propTypes;

export default connect()(SpeechRecognition(Dictaphone));

