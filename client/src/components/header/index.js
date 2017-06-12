import React, { Component } from 'react';
import logo from './logo.png';
import './header.css';
import FaBars from 'react-icons/lib/fa/bars';
import FaMicrophone from 'react-icons/lib/fa/microphone';
import FaUser from 'react-icons/lib/fa/user';
class Header extends Component {
    render() {
        return (
            <div className="header-wrapper">
                <div className="app-header">
                   <FaBars size={30}/>
                    <div className="app-title">
                    <h1><span className="highlight">re</span>PHRASE</h1><img src={logo} className="app-logo" alt="logo" />
                     </div>
                   <FaUser size={30} />
                </div>
            </div>
        );
    }
}

export default Header;