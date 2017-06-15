import React from 'react';
import './chats-list.css';
import { connect } from 'react-redux';
import { fetchChatList } from './actions';
import { Link } from 'react-router-dom';

export class ChatList extends React.Component {

  componentDidMount() {
    //go to server, get all of users chats, and save them in state
    if (this.props.user) {
      this.props.dispatch(fetchChatList(this.props.user.id));
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.user && !this.props.user) {
      this.props.dispatch(fetchChatList(nextProps.user.id));
    }
  }

  getChatRoomListings() {
    if(this.props.chatRooms){
      return this.props.chatRooms.map((room, index) => {
        return (
          <Link to={`/profile/chat/${room._id}`} key={index}>
            <li className="chat-listing">
                <p>{ `Participants: ${room.participants.join(' ')}` }</p>
                <p>{ `RoomId: ${room._id}` }</p>
            </li>
          </Link>
        )
      })
    }
    return <p>Loading</p>
  }

  render(){
      return(
      <div className='chat-list-wrapper'>
        <h1>Chat Room List</h1>
        <div className='btn-container'>
          <Link to={'/profile/new-room'}>
            <button>Start a new conversation</button>
          </Link>
        </div>
        <ul className="chat-list">
            {this.getChatRoomListings()}
        </ul>
      </div>
    )
  }

}

const mapStateToProps = state => ({
  user: state.userData.user,
  chatRooms: state.chat.chatRooms
});

export default connect(mapStateToProps)(ChatList);