import React, { Component } from 'react';
import logo from './logo.png';
import './header.css';

// <h1 className="menu">Menu Menu Menu Menu</h1> -> We can use the hamburger menu icon from react icon package

class Header extends Component {
    render() {
        return (
            <div className="app-header">
                <img src={logo} className="app-logo" alt="logo" />
                <h1>rephrase</h1>
            </div>
        );
    }
}

export default Header;