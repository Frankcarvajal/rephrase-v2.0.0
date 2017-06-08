import React, { Component } from 'react';
import logo from './logo.png';
import './header.css';
import Menu from '../menu';
import Profile from '../profile';

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