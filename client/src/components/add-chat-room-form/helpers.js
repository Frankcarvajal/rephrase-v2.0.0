export function fetchAllUsers(accessToken) {
    return fetch('/api/users', { 
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${accessToken}`,
      }
     })
      .then(responseStream => responseStream.json())
      .catch(err => console.error(err));
  }

 export function isTheSameChatRoom(participants, room) { 
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

  export function isNewChatRoomUnique(participants, chatRooms) { 
    for (let i=0; i<chatRooms.length; i++) {
      let room = chatRooms[i];
      let isTheSameRoom = isTheSameChatRoom(participants, room);
      if (isTheSameRoom) { 
        return { res: false, room } // if it is the same rm, chat room is not unique
      }
    }
    return { res: true };
  }

  export function postChatRoomToDb(accessToken, participants) {
    return fetch('/api/chat', { 
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${accessToken}`,
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ participants })
  	})
		.then(responseStream => responseStream.json())
    .catch(err => console.error(err));
  }

  export function roomAlreadyExists(newRm, allRooms) {
    for (let i=0; i<allRooms.length; i++) {
      if (allRooms[i]._id === newRm._id) {
        console.log('The room exists already...');
        return true;
      }
    }
    console.log('The room does NOT EXIST ALREADY');
    return false;
  }