import React from 'react';
import { Button } from 'antd';
import { deleteUser } from 'src/store/user/actions';
import { useDispatch } from 'react-redux';
import { deconnect } from 'src/store/register/actions';
import { useHistory } from 'react-router-dom';

const ButtonDeleteAccount = ({ profileUser }) => {
	const dispatch = useDispatch();
	const history = useHistory();
	const handleDeleteAccount = () => {
		dispatch(deleteUser(profileUser.mail));
		dispatch(deconnect());
		history.push('/');
		sessionStorage.clear();
	};
	return (
		<div>
			<Button onClick={handleDeleteAccount}>Supprimer le compte</Button>
		</div>
	);
};

export default ButtonDeleteAccount;
