import React, { Component } from 'react';
import { connect } from 'react-redux';
import logo from './logo.png';
import './header.css';

import { Link } from 'react-router-dom';
import FaBars from 'react-icons/lib/fa/bars';
import FaMicrophone from 'react-icons/lib/fa/microphone';
import FaUser from 'react-icons/lib/fa/user';
import FaHome from 'react-icons/lib/fa/home';
import FaWechat from 'react-icons/lib/fa/wechat';

export class Header extends Component {

    getUserRegistration() {
        if (this.props.user) {
            return (<a href={'/api/auth/logout'}>Log out</a>);
        }
        return (<a href={'/api/auth/google'}>Sign in with Google</a>);
    }
    getChatIcon(){
        if(this.props.user){
            return(
                <Link to={'/profile/chatlist'}><FaWechat size={30} /></Link>
            )
        }
        return (<FaWechat size={30} />)
    }

    render() {
        return (
            <div className="header-wrapper">
                <div className="app-header">
                   <FaBars size={30}/>
                    <div className="app-title">
                        <h1><span className="highlight">re</span>PHRASE</h1><img src={logo} className="app-logo" alt="logo" />
                    </div>
                    <div className="nav-icons">
                        <Link to={'/'}><FaHome size={30} /></Link>
                        { this.getChatIcon() }
                        <Link to={'/profile'}><FaUser size={30} /></Link>
                    </div>
                    {this.getUserRegistration()}    
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => ({
    user: state.userData.user
});

export default connect(mapStateToProps)(Header);