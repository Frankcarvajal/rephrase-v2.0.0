import { CHAT_LIST_REQUEST, CHAT_LIST_SUCCESS, DELETE_CHAT_ROOM_SUCCESS, DELETE_CHAT_ROOM_REQ } from './actions';
import { ADD_NEW_CHAT_ROOM } from '../add-chat-room-form/actions';

const initialState = {
  chatRooms: [],
  loading: false
}

const chatReducer = (state=initialState, action) => {
  if (action.type === CHAT_LIST_REQUEST || action.type === DELETE_CHAT_ROOM_REQ) {
    return Object.assign({}, state, {
      loading: action.loading
    });
  }
  if (action.type === CHAT_LIST_SUCCESS || action.type === DELETE_CHAT_ROOM_SUCCESS) {
    return Object.assign({}, state, {
      chatRooms: action.chatRooms,
      loading: action.loading
    })
  }
  if (action.type === ADD_NEW_CHAT_ROOM) {
    return Object.assign({}, state, {
      chatRooms: [...state.chatRooms, action.newRoom]
    });
  }
  return state;
}

export default chatReducer;