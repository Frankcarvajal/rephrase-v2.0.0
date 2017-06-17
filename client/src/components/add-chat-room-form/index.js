import React from 'react';
import FaClose from 'react-icons/lib/fa/close';
import './addChatRmForm.css';
import * as Cookies from 'js-cookie';
import { connect } from 'react-redux';

export class AddChatRoomForm extends React.Component {

  constructor(props) { 
    super(props);

    this.state = {
      users: [],
      selectedUsers: []
    };

    this.accessToken = Cookies.get('accessToken');
  }

  componentDidMount() {
    this.fetchAllUsers()
      .then(users => {
        this.setState({ users });
      });
    console.log('component mounts', this.props.chatRooms);
  }

  fetchAllUsers() { // move to helpers
    return fetch('/api/users', { 
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${this.accessToken}`,
      }
     })
      .then(responseStream => responseStream.json())
      .catch(err => console.error(err));
  }

  handleAddUser(event, userData) {
    event.preventDefault();
    let isUserAlreadySelected = false;
    for (let i=0; i<this.state.selectedUsers.length; i++) {
      if (this.state.selectedUsers[i].displayName === userData.displayName) {
        isUserAlreadySelected = true;
      }
    }
    if (!isUserAlreadySelected) {
      this.setState({
        selectedUsers: [...this.state.selectedUsers, userData]
      });
    }
  }

  handleRemoveSelectedUser(e, userData) {
    e.preventDefault();
    let newSelectedUsers = this.state.selectedUsers.filter(selected => {
      return selected.displayName !== userData.displayName;
    });
    this.setState({
      selectedUsers: newSelectedUsers
    })
  }

  displayUsersAvailable() {
    if (!this.state.users) {
      return;
    }
    return this.state.users.map((user, index) => {
      return (  
        <li key={index} onClick={ e => this.handleAddUser(e, user) }>
          {user.displayName}
        </li>  
      );
    });
  }

  displaySelectedUsers() {
    return this.state.selectedUsers.map((user, index) => { 
      return (
        <div key={index} className='selected'>{user.displayName}
          <span onClick={e => this.handleRemoveSelectedUser(e, user)}>X</span>
        </div>
      );
    });
  }

  isTheSameChatRoom(participants, room) { // move to helpers
    if (participants.length !== room.participants.length) {
      return false;
    }
    for (let j=0; j < participants.length; j++) {
      if (room.participants.indexOf(participants[j]) === -1) {
        return false;
      }
    } 
    return true;
  }

  isNewChatRoomUnique(participants) { // move to helpers
    for (let i=0; i<this.props.chatRooms.length; i++) {
      let room = this.props.chatRooms[i];
      let isTheSameRoom = this.isTheSameChatRoom(participants, room);
      if (isTheSameRoom) return { res: false, room };
    }
    return { res: true };
  }

  sendNewRoomRequest(e){
		e.preventDefault();
		const participants = this.state.selectedUsers;
    const isUnique = this.isNewChatRoomUnique(participants);
    if (!isUnique.res) {
      return this.props.history.push(`/profile/chat/${isUnique.room._id}`);
    }
    return fetch('/api/chat', { // move to helpers
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${this.accessToken}`,
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ participants })
  	})
		.then(responseStream => responseStream.json())
		.then(newChatRoom => {
      return this.props.history.push(`/profile/chat/${newChatRoom._id}`);
  	})
  }

  render() {
    return (
      <div className='add-rm-form-wrapper'>
        <div className='close-icon-bin'>
          <FaClose />
        </div>
        <h1>Open a new conversation</h1>
        <form action="">
          <input type="text" placeholder='Start a new conversation'/>
          <button onClick={e => this.sendNewRoomRequest(e)}>Go</button>
        </form>
        <div className='selected-users-wrap'>
          {this.displaySelectedUsers()}
        </div>
        <div className='user-bin'>
          <ul className='user-bin-list'>
            { this.displayUsersAvailable() }
          </ul>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  user: state.userData.user,
  chatRooms: state.chat.chatRooms
});

export default connect(mapStateToProps)(AddChatRoomForm);