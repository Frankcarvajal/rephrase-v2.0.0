import React, { Component } from 'react';
import { connect } from 'react-redux';
// import {BrowserRouter as Router, Route, Redirect} from 'react-router-dom';

import { toggleBtn, editBtn} from './actions';
import {  postTranscriptGetTranslation } from '../dictaphone/actions';

import Header from '../header';
import LanguageChoice from '../language-choice';
import EditButton from '../edit-btn';
import './App.css';
import Dictaphone from '../dictaphone';
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

  toggleSpeechRecognition() {
    this.props.dispatch(toggleBtn());
  }
  handleSpeechRecognition() {
    if (this.props.speechRecognitionOn) {
      return (<Dictaphone />);
    }
    else {
      return (
        <div>
        <button className="speak" onClick={(e) => 
          this.toggleSpeechRecognition()}>
          <i className="fa fa-microphone" aria-hidden="true"></i>
        </button><EditButton className="edit" onClick={e => this.toggleEdit()} />
          </div>
      );
    }
  }
  updateText(){
    console.log('this has been updated');
  }
  toggleEdit(e){
      this.props.dispatch(editBtn())
  }
  handleEditSubmit(event){
    event.preventDefault();
    let value = this.input.value;
    console.log('handleEditSubmit worked=>', this.input.value);
    this.props.dispatch(postTranscriptGetTranslation(value));
  }
  handleEdit(e){
    if(!this.props.speechRecognitionOn){
      if(this.props.isEditing) {
        return (
          <div>
            <input type="text" ref={input => this.input = input} defaultValue={this.props.speechText.originalText}></input>
            <button className="submit" type="submit">Submit</button>
          </div>
        );
      }
      else {
        return (
          <div className="original-text-container">
            <p className="original-text" value="speak to have text trascribed">{this.props.speechText.originalText}</p>
            <div className="edit-container"></div>
          </div>
        );
      }
    }
  }

  render() {
    return (
      <div className="app">
      
        <Header />
        <LanguageChoice />
        {this.handleSpeechRecognition()}
        <form id="translate" onSubmit={e =>{ this.handleEditSubmit(e);this.toggleEdit();}}>
          {this.handleEdit()}

        </form>
                <hr/>
          <div className="translation">
            <p>{this.props.speechText.translatedText}</p>
          </div>

      </div>
    );
  }
}

const mapStateToProps = state => ({
  speechRecognitionOn: state.speech.speechRecognitionOn,
  speechText: state.basicTranslate,
  isEditing: state.speech.isEditing
});

export default connect(mapStateToProps)(App);
