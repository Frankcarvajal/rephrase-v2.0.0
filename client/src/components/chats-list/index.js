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
      const userId = this.props.user.id;
      this.props.dispatch(fetchChatList(userId, this.accessToken));
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.user && !this.props.user) {
      this.props.dispatch(fetchChatList(nextProps.user.id, this.accessToken));
    }
  }

  getChatRoomListings() {
    if (this.props.chatRooms && this.props.user) {
      const rooms = this.props.chatRooms;
      const userData = this.props.user;
      return (<RoomListings chatRooms={rooms} user={userData} />);
    }
    return null;
  }

  render(){
      return(
      <div className='chat-list-wrapper'>
        <h3>My Open Conversations</h3>
        <div className='btn-container'>
          <Link to={'/profile/new-room'}>
            <Button waves='light'>New conversation</Button>
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