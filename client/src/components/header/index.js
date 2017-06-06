import React, { Component } from 'react';
import logo from './logo.png';
import './header.css';
import Menu from '../menu';
import Profile from '../profile';

class Header extends Component {
    render() {
        return (
            <div className="App-header">
                <Menu />
                <img src={logo} className="App-logo" alt="logo" />
                <Profile />
                <h2>rephrase</h2>
            </div>
        );
    }
}

export default Header;