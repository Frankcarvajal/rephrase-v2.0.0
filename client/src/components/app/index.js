import React, { Component } from 'react';
import Header from '../header';
import Chat from '../chat';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Header />
        <Chat />
      </div>
    );
  }
}

export default App;
