import React, { Component } from 'react';
import { connect } from 'react-redux';
import logo from './logo.png';
import './header.css';

import FaBars from 'react-icons/lib/fa/bars';
import FaMicrophone from 'react-icons/lib/fa/microphone';
import FaUser from 'react-icons/lib/fa/user';

export class Header extends Component {

    logOutBtn() {
        if (this.props.user) {
            return (<a href={'/api/auth/logout'}>Log out</a>);
        }
    }

    render() {
        return (
            <div className="header-wrapper">
                <div className="app-header">
                   <FaBars size={30}/>
                    <div className="app-title">
                    <h1><span className="highlight">re</span>PHRASE</h1><img src={logo} className="app-logo" alt="logo" />
                     </div>
                    <FaUser size={30} />
                    <a href={'/api/auth/google'}>Sign in with Google</a>
                    {this.logOutBtn()}    
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => ({
    user: state.userData.user
});

export default connect(mapStateToProps)(Header);