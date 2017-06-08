import { TOGGLE_BTN } from './actions';

const initialState = {
  speechRecognitionOn: false
};

const speechRecognitionReducer = (state=initialState, action) => {
  if (action.type === TOGGLE_BTN) {
    return Object.assign({}, state, { 
      speechRecognitionOn: !state.speechRecognitionOn 
    });
  }
  return state;
}

export default speechRecognitionReducer;