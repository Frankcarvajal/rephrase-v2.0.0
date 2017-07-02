export const CHAT_LIST_REQUEST = 'CHAT_LIST_REQUEST';
export const chatListRequest = () => ({
  type: CHAT_LIST_REQUEST,
  loading: true,
});

export const CHAT_LIST_SUCCESS = 'CHAT_LIST_SUCCESS';
export const chatListSuccess = (chatRooms) => ({
  type: CHAT_LIST_SUCCESS,
  loading: false,
  chatRooms
});

export const fetchChatList = (userId, accessToken) => dispatch => {
  dispatch(chatListRequest());
  fetch(`/api/chat/${userId}`, {
    method: 'GET',
    headers: {
			'Authorization': `Bearer ${accessToken}` 
		}
  })
  .then(res => res.json())
  .then(chatRooms => {
    return dispatch(chatListSuccess(chatRooms))
  })
  .catch(err => console.error(err))
} 

export const DELETE_CHAT_ROOM_REQ = 'DELETE_CHAT_ROOM_REQ';
export const deleteChatRoomReq = () => ({
  type: DELETE_CHAT_ROOM_REQ,
  loading: true
});

export const DELETE_CHAT_ROOM_SUCCESS = 'DELETE_CHAT_ROOM_SUCCESS';
export const deleteChatRoomSuccess = chatRooms => ({
  type: DELETE_CHAT_ROOM_SUCCESS,
  loading: false,
  chatRooms
});

export const deleteChatRoom = (roomId, accessToken) => dispatch => {
  dispatch(deleteChatRoomReq());
  return fetch(`/api/chat/chatRoom/${roomId}`, {
      method: 'DELETE',
      headers: {
			  'Authorization': `Bearer ${accessToken}`
		  }
    })
    .then(response => response.json())
    .then(newChatList => {
      return dispatch(deleteChatRoomSuccess(newChatList));
    })
    .catch(err => console.error(err));
}