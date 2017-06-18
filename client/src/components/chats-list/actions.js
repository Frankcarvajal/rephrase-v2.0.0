export const CHAT_LIST_REQUEST = 'CHAT_LIST_REQUEST';
export const chatListRequest = () => ({
  type: CHAT_LIST_REQUEST,
  loading: true,
})

export const CHAT_LIST_SUCCESS = 'CHAT_LIST_SUCCESS';
export const chatListSuccess = (chatRooms) => ({
  type: CHAT_LIST_SUCCESS,
  loading: false,
  chatRooms
})

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