export const TRANSLATION_REQUEST = 'TRANSLATION_REQUEST';
export const translationRequest = () => ({
    type: TRANSLATION_REQUEST,
    loading: true
});

export const TRANSLATION_SUCCESS = 'TRANSLATION_SUCCESS';
export const translationSuccess = data => ({
    type: TRANSLATION_SUCCESS,
    loading: false,
    detectedSourceLanguage: data.translation.detectedSourceLanguage,
    originalText: data.translation.originalText,
    translatedText: data.translation.translatedText
});

export const postTranscriptGetTranslation = (transcript, language) => dispatch => {
  console.log(transcript, language);
  dispatch(translationRequest());
  return fetch('/api/translate', {
    method: "POST",
    headers: {
      'Accept': 'application/json, text/plain, */*',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({toTranslate: transcript, targetLanguage: language})
  })
  .then(res => res.json())
  .then(translationData => { 
    console.log(translationData);
    dispatch(translationSuccess(translationData));
  })
  .catch(err => console.error(err));
}

