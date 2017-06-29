import React, { Component } from 'react';
import PropTypes from 'prop-types';
import SpeechRecognition from 'react-speech-recognition';
import { connect } from 'react-redux';
import { postTranscriptGetTranslation } from './actions';
import { toggleBtn } from '../home/actions';
import './dictaphone.css';
import EditButton from '../edit-btn';
import FaMicrophoneSlash from 'react-icons/lib/fa/microphone-slash';

    const propTypes = {
        transcript: PropTypes.string,
        resetTranscript: PropTypes.func,
        browserSupportsSpeechRecognition: PropTypes.bool,
    }
    
class Dictaphone extends Component {

  render() {
    const { transcript, resetTranscript, browserSupportsSpeechRecognition, recognition } = this.props

    if (!browserSupportsSpeechRecognition) {
      alert('Your browser does not support speech recognition. Please use Google Chrome. Otherwise, sign in and you can still use the chat room feature!');
      return (
        <div className='dictaphone-wrapper'>
          <button className="speak">
              <FaMicrophoneSlash />
          </button>
          <EditButton className="edit" />
        </div>
      );
    }

    const sendTranscriptToServer = transcript => {
      recognition.onend = function(e) { console.log('SEND-TRANSCRIPT-TO-SERVER:', this.props) }
      const final = transcript;
      resetTranscript();
      recognition.stop(); 
      this.props.dispatch(toggleBtn());
      this.props.dispatch(postTranscriptGetTranslation(final, this.props.userLanguage ));
    }

    return (
      <div className='dictaphone-wrapper'>
        <div>
          <button className="speak" onClick={(e) => sendTranscriptToServer(transcript)}>
            <FaMicrophoneSlash />
          </button>
          <EditButton className="edit" />
        </div>
        <div className="transcript">{transcript}</div>
      </div>
    )
  }

}

Dictaphone.propTypes = propTypes;

const mapStateToProps = state => ({
  userLanguage: state.selectedLanguage.userLanguage
});

export default connect(mapStateToProps)(SpeechRecognition(Dictaphone));

