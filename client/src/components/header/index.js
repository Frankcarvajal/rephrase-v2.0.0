import React, { Component } from 'react';
import logo from './logo.png';
import './header.css';

// <h1 className="menu">Menu Menu Menu Menu</h1> -> We can use the hamburger menu icon from react icon package

class Header extends Component {
    render() {
        return (
            <div className="header-wrapper">
                <div className="app-header">
                    <i className="fa fa-bars" aria-hidden="true"></i>
                    <div className="app-title">
                    <h1><span className="highlight">re</span>PHRASE</h1><img src={logo} className="app-logo" alt="logo" />
                     </div>
                    <i className="fa fa-user" aria-hidden="true"></i>
                </div>
            </div>
        );
    }
}

export default Header;