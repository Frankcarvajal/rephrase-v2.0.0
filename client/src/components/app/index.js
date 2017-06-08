import React, { Component } from 'react';
import Header from '../header';
import Dictaphone from '../dictaphone';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Header />
        <Dictaphone />
      </div>
    );
  }
}

export default App;
