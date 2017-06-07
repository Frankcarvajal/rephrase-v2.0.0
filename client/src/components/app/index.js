import React, { Component } from 'react';
import Header from '../header';
import Output from '../output';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Header />
        <Output />
      </div>
    );
  }
}

export default App;
