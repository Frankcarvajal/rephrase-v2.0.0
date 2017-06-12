import React, { Component } from 'react';
import { connect } from 'react-redux';
import logo from './logo.png';
import './header.css';

// <h1 className="menu">Menu Menu Menu Menu</h1> -> We can use the hamburger menu icon from react icon package

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
                    <i className="fa fa-bars" aria-hidden="true"></i>
                    <div className="app-title">
                    <h1><span className="highlight">re</span>PHRASE</h1><img src={logo} className="app-logo" alt="logo" />
                     </div>
                    <i className="fa fa-user" aria-hidden="true"></i>
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