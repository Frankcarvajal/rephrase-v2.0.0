export const UPDATE_DEFAULT_LANGUAGE_REQUEST = 'UPDATE_DEFAULT_LANGUAGE_REQUEST';
export const updateDefaultLanguageRequest = () => ({
  type: UPDATE_DEFAULT_LANGUAGE_REQUEST,
  loading: true
})

export const UPDATE_DEFAULT_LANGUAGE_SUCCESS = 'UPDATE_DEFAULT_LANGUAGE_SUCCESS';
export const updateDefaultLanguageSuccess = user => ({
  type: UPDATE_DEFAULT_LANGUAGE_SUCCESS,
  user,
  loading: false
})

export const saveDefaultLanguageToDatabase = (language, accessToken) => dispatch => {
  dispatch(updateDefaultLanguageRequest());
  fetch('/api/me', {
      method: 'PUT',
      headers: { 
			'Authorization': `Bearer ${accessToken}`,
      'Accept': 'application/json, text/plain, */*',
      'Content-Type': 'application/json'
      },
      body: JSON.stringify({ defaultLanguage: language }) 
		})
    .then(res => res.json())
    .then(user => {
      return dispatch(updateDefaultLanguageSuccess(user));
    })
    .catch(err => console.error(err));
}