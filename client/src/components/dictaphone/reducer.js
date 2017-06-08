import { TRANSLATION_REQUEST, TRANSLATION_SUCCESS } from './actions';

const initialState = {
  loading: false,
  detectedSourceLanguage: null,
  originalText: null,
  translatedText: null
};

const basicTranslateReducer = (state=initialState, action) => {
  if (action.type === TRANSLATION_REQUEST) {
    return Object.assign({}, state, { loading: action.loading });
  }
  else if (action.type === TRANSLATION_SUCCESS) {
    return Object.assign({}, state, {
      loading: action.loading,
      detectedSourceLanguage: action.detectedSourceLanguage,
      originalText: action.originalText,
      translatedText: action.translatedText
    });
  }
  return state;
}

export default basicTranslateReducer;