import React, { Component } from 'react';
import { connect } from 'react-redux';
import {BrowserRouter as Router, Route, Redirect} from 'react-router-dom';

import Home from '../home';
import Profile from '../profile';
import ChatRoom from '../chat-room';
import * as Cookies from 'js-cookie';
import { fetchUserData } from './actions';
import ChatList from '../chats-list';
import Header from '../header';
import AddChatRoomForm from '../add-chat-room-form';

export class App extends Component {

  componentDidMount() {
    const accessToken = Cookies.get('accessToken');
    if (accessToken) {
      // fetch user data and set it in state
      this.props.dispatch(fetchUserData(accessToken));
    }
  }

  handleProfileView() {
    if (!this.props.user) {
      return (<Redirect to={'/'} />);
    }
    return (<Profile />);
  }

  render() {
    return (
      <Router>
        <div className="app">
          <Header />
          <Route exact path="/" component={Home} />
          <Route exact path="/profile" component={() => this.handleProfileView()} />
          <Route exact path="/profile/chat/:roomId" component={ChatRoom} />
          <Route exact path="/profile/chatlist" component={ChatList} />
          <Route exact path="/profile/new-room" component={AddChatRoomForm} />
        </div>
      </Router>
    );
  }
}

const mapStateToProps = state => ({
  user: state.userData.user
});

export default connect(mapStateToProps)(App);
