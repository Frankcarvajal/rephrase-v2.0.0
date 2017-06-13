import React from 'react';
import './chats-list.css';
import { connect } from 'react-redux';
import { fetchChatList } from './actions';
import { Link } from 'react-router-dom';

export class ChatList extends React.Component{

  componentDidMount(){
    //go to server, get all of users chats, and save them in state
    this.props.dispatch(fetchChatList(this.props.user.id));
  }
  getChatRoomListings(){
    if(this.props.chatRooms){
      return this.props.chatRooms.map((room, index) => {
        return (
          <Link to={`/profile/chat/${room._id}`}>
            <li className="chat-listing" key={index} >
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
    console.log(this.props.chatRooms);
      return(
      <div>
        <ul className="chat-list">
            <h1>Chat Room List</h1>
            {this.getChatRoomListings()}
        </ul>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  user: state.userData.user,
  chatRooms: state.chat.chatRooms
})
export default connect(mapStateToProps)(ChatList);