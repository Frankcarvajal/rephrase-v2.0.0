// combine reducers go here
import { combineReducers } from 'redux';
import basicTranslateReducer from './components/dictaphone/reducer';
import speechRecognitionReducer from './components/home/reducer';
import selectLanguageReducer from './components/language-choice/reducer';
import userReducer from './components/app/userReducer';
import chatReducer from './components/chats-list/reducer'

const rootReducer = combineReducers({
    speech: speechRecognitionReducer,
    userData: userReducer,
    selectedLanguage: selectLanguageReducer,
    basicTranslate: basicTranslateReducer,
    chat: chatReducer
});

export default rootReducer;