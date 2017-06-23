import React, { Component } from 'react';
import { connect } from 'react-redux';
import logo from '../../assets/logo.png';
import './header.css';

import { Link } from 'react-router-dom';
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
                <Link to={'/profile/chatlist'}><FaWechat size={35} /></Link>
            )
        }
        return (<FaWechat size={30} />)
    }

    render() {
        return (
        <div className="header-wrapper">
            <div className="app-header">
                <div className="app-title">
                  <img src={logo} className='logo-image' alt='logo'/>
                </div>
                <div className="nav-icons">
                    <Link to={'/'}><FaHome size={35} /></Link>
                    { this.getChatIcon() }
                    <Link to={'/profile'}><FaUser size={35} /></Link>
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