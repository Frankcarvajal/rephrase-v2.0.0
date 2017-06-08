// combine reducers go here
import { combineReducers } from 'redux';
import basicTranslateReducer from './components/dictaphone/reducer'
import speechRecognitionReducer from './components/app/reducer';

const rootReducer = combineReducers({
    speech: speechRecognitionReducer,
    basicTranslate: basicTranslateReducer
});

export default rootReducer;