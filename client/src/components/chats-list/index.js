import React from 'react';
import './chats-list.css';
import * as Cookies from 'js-cookie'; 
import { connect } from 'react-redux';
import { fetchChatList } from './actions';
import { Link } from 'react-router-dom';
import RoomListings from '../room-listings';
import { Button } from 'react-materialize';

export class ChatList extends React.Component {

  constructor(props) {
    super(props);
    
    this.accessToken = Cookies.get('accessToken');
  }

  componentDidMount() {
    //go to server, get all of users chats, and save them in state
    if (this.props.user) {
      this.props.dispatch(fetchChatList(this.props.user.id, this.accessToken));
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.user && !this.props.user) {
      this.props.dispatch(fetchChatList(nextProps.user.id, this.accessToken));
    }
  }

  getChatRoomListings() {
    if (this.props.chatRooms && this.props.user) {
      return (<RoomListings chatRooms={this.props.chatRooms} user={this.props.user} />);
    }
    return null;
  }

  render(){
      return(
      <div className='chat-list-wrapper'>
        <h1>My Open Conversations</h1>
        <div className='btn-container'>
          <Link to={'/profile/new-room'}>
            <Button waves='light'>Start a new conversation</Button>
          </Link>
        </div>
          {this.getChatRoomListings()}
      </div>
    )
  }

}

const mapStateToProps = state => ({
  user: state.userData.user,
  chatRooms: state.chat.chatRooms
});

export default connect(mapStateToProps)(ChatList);