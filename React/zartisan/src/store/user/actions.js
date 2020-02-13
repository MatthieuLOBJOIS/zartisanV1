export const USER_SINGLE = 'search/actions/USER_SINGLE';

export const userSingle = (email) => ({
	type: USER_SINGLE,
	email
});

export const RESPONSE_USER = 'search/actions/RESPONSE_USER';

export const responseUser = (data) => ({
	type: RESPONSE_USER,
	data
});

export const EDIT_USER = 'search/actions/EDIT_USER';

export const editUser = (data) => ({
	type: EDIT_USER,
	data
});
