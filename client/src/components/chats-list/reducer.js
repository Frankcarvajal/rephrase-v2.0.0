import { CHAT_LIST_REQUEST, CHAT_LIST_SUCCESS } from './actions';

const initialState = {
  chatRooms: [],
  loading: false
}

const chatReducer = (state=initialState, action) => {
  if (action.type === CHAT_LIST_REQUEST) {
    return Object.assign({}, state, {
      loading: action.loading
    });
  }
  if (action.type === CHAT_LIST_SUCCESS) {
    return Object.assign({}, state, {
      chatRooms: action.chatRooms,
      loading: action.loading
    })
  }
  return state;
}

export default chatReducer;