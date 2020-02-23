import React from 'react';
import { Button } from 'antd';
import { deleteUser } from 'src/store/user/actions';
import { useDispatch } from 'react-redux';

const ButtonDeleteAccount = ({ profileUser }) => {
	const dispatch = useDispatch();
	const handleDeleteAccount = () => {
		dispatch(deleteUser(profileUser.mail));
	};
	return (
		<div>
			<Button onClick={handleDeleteAccount}>Supprimer le compte</Button>
		</div>
	);
};

export default ButtonDeleteAccount;
