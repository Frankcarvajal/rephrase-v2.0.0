import * as Cookies from 'js-cookie';

export const USER_DATA_REQUEST = 'USER_DATA_REQUEST';
export const userDataRequest = () => ({
    type: USER_DATA_REQUEST,
    loading: true
});

export const USER_DATA_SUCCESS = 'USER_DATA_SUCCESS';
export const userDataSuccess = user => ({
    type: USER_DATA_SUCCESS,
    loading: false,
    user
});

export const fetchUserData = accessToken => dispatch => {
	dispatch(userDataRequest());
	fetch('/api/me', {
		headers: {
			'Authorization': `Bearer ${accessToken}`
		}
	})
	.then(res => {
		if (!res.ok) {
			if (res.status === 401) {
				// Unauthorized; clear the cookie
				Cookies.remove('accessToken');
				return;
			}
			throw new Error(res.statusText);
		}
		return res.json();
	})
	.then(currentUser =>{
		return dispatch(userDataSuccess(currentUser));
	})
	.catch(err => console.error(err));
}
