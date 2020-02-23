export const USER_SINGLE = 'user/actions/USER_SINGLE';

export const userSingle = (email) => ({
	type: USER_SINGLE,
	email
});

export const RESPONSE_USER = 'user/actions/RESPONSE_USER';

export const responseUser = (data) => ({
	type: RESPONSE_USER,
	data
});

export const EDIT_USER = 'user/actions/EDIT_USER';

export const editUser = (data) => ({
	type: EDIT_USER,
	data
});

export const DELETE_USER = 'user/actions/DELETE_USER';

export const deleteUser = (data) => ({
	type: DELETE_USER,
	data
});

export const DELETE_ACCOUNT = 'user/actions/DELETE_ACCOUNT';

export const deleteAccount = () => {
	type: DELETE_ACCOUNT;
};
