import React from 'react';
import { Button } from 'antd';
import { deleteUser } from 'src/store/user/actions';
import { useDispatch } from 'react-redux';
import './style.sass';
import PropTypes from 'prop-types';

const ButtonDeleteAccount = ({ profileUser, profileRole }) => {
	const dispatch = useDispatch();
	const handleDeleteAccount = () => {
		switch (profileRole) {
			case 'artisan':
				console.log('delete artisan profile');
				break;
			case 'user':
				dispatch(deleteUser(profileUser.mail));
				break;
		}
	};
	return (
		<div>
			<Button className="buttons button-delete" onClick={handleDeleteAccount}>
				Supprimer le compte
			</Button>
		</div>
	);
};

ButtonDeleteAccount.propTypes = {
	profileUser: PropTypes.object,
	profileRole: PropTypes.string.isRequired
};

export default ButtonDeleteAccount;
