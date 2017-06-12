// combine reducers go here
import { combineReducers } from 'redux';
import basicTranslateReducer from './components/dictaphone/reducer'
import speechRecognitionReducer from './components/app/reducer';
import selectLanguageReducer from './components/language-choice/reducer';

const rootReducer = combineReducers({
    speech: speechRecognitionReducer,
    basicTranslate: basicTranslateReducer,
    selectedLanguage: selectLanguageReducer
});

export default rootReducer;