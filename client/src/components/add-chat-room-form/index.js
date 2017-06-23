import React from 'react';
import FaClose from 'react-icons/lib/fa/close';
import './addChatRmForm.css';
import * as Cookies from 'js-cookie';
import { connect } from 'react-redux';
import { fetchChatList } from '../chats-list/actions';
import { Link } from 'react-router-dom';
import { Row, Input, Button } from 'react-materialize';

// require the helper functions
import { fetchAllUsers, isNewChatRoomUnique, postChatRoomToDb } from './helpers';

export class AddChatRoomForm extends React.Component {

  constructor(props) { 
    super(props);

    this.state = {
      users: [],
      selectedUsers: [],
      search: ''
    };

    this.accessToken = Cookies.get('accessToken');
  }

  componentDidMount() {
    fetchAllUsers(this.accessToken)
      .then(users => {
        this.setState({ users });
      });
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.user && !this.props.user) {
      this.props.dispatch(fetchChatList(nextProps.user.id, this.accessToken));
    }
  }

  handleAddUser(event, userData) {
    event.preventDefault();
    if (this.state.selectedUsers.length === 3) {
      return;
    }
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

  searchDisplay() {
    if (!this.state.users || !this.props.chatRooms) {
      return (<p>Loading...</p>);
    }
    if (this.state.search.length === 0) {
      return (
        <div className="recent-converstions">
          <h4>Recent Conversations</h4>
          { this.displayRecentConvos() }
        </div>
      );
    }
    return (
      <div>
        <h4>Available Users</h4>
        { this.displaySearchedUsers() }
      </div>
    );
  }

  displayRecentConvos() {
    // Loop over the chat rooms and put in list of participants plus links to the rooms
    return this.props.chatRooms.map((room, index) => {
      const names = room.participants.map(u => { 
        if (u.displayName === this.props.user.displayName) {
          return null;
        }
        return u.displayName;
      });
      return ( 
        <Link to={`/profile/chat/${room._id}`} key={index}>
          <li className="chat-listing">
            <p><span>Participants: </span>{`${names.join(' ')}` }</p>
            {/*<p>{ `RoomId: ${room._id}` }</p>*/}
          </li>
        </Link>
      );
    });
  }

  displaySearchedUsers() {
    return this.state.users.map((user, index) => {
      if (user.displayName.indexOf(this.state.search) === -1) {
        return null;
      }
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
    if (!this.props.chatRooms) {
      return;
    }
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

  handleChange(e) {
    this.setState({
      search: e.currentTarget.value
    });
  }

  render() {
    return (
      <div className='add-rm-form-wrapper'>
        <div className="conversation-wrapper">
          <h3>Open a new conversation</h3>
          <div className='close-icon-bin'>
            <Link to='/profile/chatlist'>
              <FaClose />
            </Link>
          </div>
        </div>
        <Row>
          <Input
            type="text" 
            placeholder='Start a new conversation' 
            onChange={ e => this.handleChange(e) }
             
          />
          <Button waves='light' onClick={ e => this.sendNewRoomRequest(e) }>Go</Button>
          
        </Row>
        <div className='selected-users-wrap'>
          {this.displaySelectedUsers()}
        </div>
        <div className='user-bin'>
          <ul className='user-bin-list'>
            { this.searchDisplay() }
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