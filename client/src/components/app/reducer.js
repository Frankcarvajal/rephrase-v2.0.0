import { TOGGLE_BTN, EDIT_BTN, TOGGLE_DICTAPHONE_IS_MOUNTED } from './actions';

const initialState = {
  speechRecognitionOn: false,
  isEditing: false,
  dictaphoneIsMounted: false
};

const speechRecognitionReducer = (state=initialState, action) => {
  if (action.type === TOGGLE_BTN) {
    return Object.assign({}, state, { 
      speechRecognitionOn: !state.speechRecognitionOn 
    });
  }
  if (action.type === EDIT_BTN) {
    console.log('We are totally editting', state);
    return Object.assign({}, state, {
      isEditing: !state.isEditing
    })
  }
    if (action.type === TOGGLE_DICTAPHONE_IS_MOUNTED) {
    console.log('We are totally editting');
    return Object.assign({}, state, {
      dictaphoneIsMounted: state.dictaphoneIsMounted
    })
  }
  return state;
}

export default speechRecognitionReducer;