import { SELECT_LANGUAGE } from './actions';

const initialState = {
  userLanguage: 'en',
};

const selectLanguageReducer = (state=initialState, action) => {
  console.log('This is the language I chose:  ', state.userLanguage );
  if(action.type === SELECT_LANGUAGE) {
    return Object.assign({}, state, {
      userLanguage: action.userLanguage
    });
  }
  return state;
}

export default selectLanguageReducer;