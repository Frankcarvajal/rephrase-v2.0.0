import React from 'react';
import FaClose from 'react-icons/lib/fa/close';
import './addChatRmForm.css';
import * as Cookies from 'js-cookie';
import { connect } from 'react-redux';

// require the helper functions
import { fetchAllUsers, isNewChatRoomUnique, postChatRoomToDb } from './helpers';

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
    fetchAllUsers(this.accessToken)
      .then(users => {
        this.setState({ users });
      });
  }

  handleAddUser(event, userData) {
    event.preventDefault();
    let isUserAlreadySelected = false;
    for (let i=0; i<this.state.selectedUsers.length; i++) {
      if (this.state.selectedUsers[i].displayName === userData.displayName) {
        isUserAlreadySelected = true;
      }
    }
    if (!isUserAlreadySelected && userData._id !== this.props.user.id) {
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
        <div key={index} className='selected'>
          {user.displayName}
          <span onClick={e => this.handleRemoveSelectedUser(e, user)}>X</span>
        </div>
      );
    });
  }

  sendNewRoomRequest(e){
		e.preventDefault();
    const selectedUsersIds = this.state.selectedUsers.map(users => users._id);
		const participants = [...selectedUsersIds, this.props.user.id];
    const isUnique = isNewChatRoomUnique(participants, this.props.chatRooms);
    if (!isUnique.res) { // then chat room already exists
      return this.props.history.push(`/profile/chat/${isUnique.room._id}`);
    }
    return postChatRoomToDb(this.accessToken, participants)
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