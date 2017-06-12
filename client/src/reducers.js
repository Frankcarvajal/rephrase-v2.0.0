// combine reducers go here
import { combineReducers } from 'redux';
import basicTranslateReducer from './components/dictaphone/reducer';
import speechRecognitionReducer from './components/app/reducer';
import selectLanguageReducer from './components/language-choice/reducer';
import userReducer from './components/app/userReducer';

const rootReducer = combineReducers({
    speech: speechRecognitionReducer,
    userData: userReducer,
    selectedLanguage: selectLanguageReducer,
    basicTranslate: basicTranslateReducer
});

export default rootReducer;