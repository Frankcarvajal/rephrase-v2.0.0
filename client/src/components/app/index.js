import React, { Component } from 'react';
import Header from '../header';
import LanguageChoice from '../language-choice';
import EditButton from '../edit-btn';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
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
      </div>
 
    );
  }
}

export default App;
