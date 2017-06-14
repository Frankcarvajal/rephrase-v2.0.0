import { SELECT_LANGUAGE } from './actions';

const initialState = {
  userLanguage: 'en',
};

const selectLanguageReducer = (state=initialState, action) => {
  if(action.type === SELECT_LANGUAGE) {
    return Object.assign({}, state, {
      userLanguage: action.userLanguage
    });
  }
  return state;
}

export default selectLanguageReducer;