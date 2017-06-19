import { USER_DATA_REQUEST, USER_DATA_SUCCESS } from './actions';
import { UPDATE_DEFAULT_LANGUAGE_REQUEST, UPDATE_DEFAULT_LANGUAGE_SUCCESS} from '../profile/actions';

const initialState = {
  user: null,
  loading: false,
};

const userReducer = (state=initialState, action) => {
  if (action.type === USER_DATA_REQUEST) {
    return Object.assign({}, state, { 
      loading: action.loading
    });
  }
  if (action.type === USER_DATA_SUCCESS) {
    return Object.assign({}, state, {
      user: action.user,
      loading: action.loading
    });
  }
  if (action.type === UPDATE_DEFAULT_LANGUAGE_REQUEST){
    return Object.assign({}, state, {
      loading: action.loading
    });
  }
  if (action.type === UPDATE_DEFAULT_LANGUAGE_SUCCESS){
    return Object.assign({}, state, {
      user: action.user,
      loading: action.loading
    })
  }
  return state;
}

export default userReducer;