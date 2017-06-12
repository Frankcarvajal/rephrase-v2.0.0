import * as Cookies from 'js-cookie';

export const TOGGLE_BTN = 'TOGGLE_BTN';
export const toggleBtn = () => ({
    type: TOGGLE_BTN
});
export const  EDIT_BTN = 'EDIT_BTN';
export const editBtn = (isEditing) => ({
    type: EDIT_BTN,
    isEditing
});
export const TOGGLE_DICTAPHONE_IS_MOUNTED = 'TOGGLE_DICTAPHONE_IS_MOUNTED';
export const toggleDictaphoneIsMounted = (dictaphoneIsMounted) => ({
    type: TOGGLE_DICTAPHONE_IS_MOUNTED,
    dictaphoneIsMounted
});

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