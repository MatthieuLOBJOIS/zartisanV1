//Imports of dependencies
import React from 'react';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import { Button } from 'antd';

//Local imports
import { deleteUser } from 'src/store/user/actions';
import './style.sass';

//Components for page "ProfileSettingsUser and ProfileSettingsArtisan" : delete a account
const ButtonDeleteAccount = ({ profileUser, profileRole }) => {
	//Hooks
	const dispatch = useDispatch();

	//Event handler that triggers an action for delete an account
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
//PropTypes
ButtonDeleteAccount.propTypes = {
	profileUser: PropTypes.object,
	profileRole: PropTypes.string.isRequired
};

export default ButtonDeleteAccount;
