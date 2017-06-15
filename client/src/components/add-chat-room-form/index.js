import React from 'react';
import FaClose from 'react-icons/lib/fa/close';
import './addChatRmForm.css';
import { connect } from 'react-redux';
// import { Link } from 'react-router-dom';

export class AddChatRoomForm extends React.Component {

  constructor(props) { 
    super(props);

    this.state = {
      users: [],
      selectedUsers: []
    };
  }

  componentDidMount() {
    this.fetchAllUsers()
      .then(users => {
        this.setState({ users });
      });
  }

  fetchAllUsers() {
    return fetch('/api/users', { method: 'GET' })
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
      console.log(userData);
      this.setState({
        selectedUsers: [...this.state.selectedUsers, userData]
      });
    }
  }

  handleRemoveSelectedUser(e, userData) {

  }

  displayUsersAvailable() {
    if (!this.state.users) {
      return;
    }
    return this.state.users.map((user, index) => {
      const userData = {
        displayName: user.displayName,
        id: user._id
      }; 
      return (  
        <li key={index} onClick={ e => this.handleAddUser(e, userData) }>
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

  render() {
    return (
      <div className='add-rm-form-wrapper'>
        <div className='close-icon-bin'>
          <FaClose />
        </div>
        <h1>Open a new conversation</h1>
        <form action="">
          <input type="text" placeholder='Start a new conversation'/>
          <button>Go</button>
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
  user: state.userData.user
});

export default connect(mapStateToProps)(AddChatRoomForm);