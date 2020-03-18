import React from 'react';
import { Button } from 'antd';
import { useDispatch } from 'react-redux';
import cookies from 'js-cookie';
import PropTypes from 'prop-types';

import './style.sass';

const ButtonSaveAccount = ({
	profileRole,
	profileArtisan,
	artisanEdit,
	artisanData,
	profileUser,
	editUser,
	userSingle
}) => {
	const dispatch = useDispatch();

	let token = cookies.get('TOKEN');
	let parseJwt = (token) => {
		try {
			return JSON.parse(atob(token.split('.')[1]));
		} catch (e) {
			return null;
		}
	};

	let tokenEmail = '';
	if (token != null) {
		tokenEmail = parseJwt(token).username;
	}

	const handleSaveClick = () => {
		console.log(profileRole, 'test');
		switch (profileRole) {
			case 'artisan':
				dispatch(
					artisanEdit(
						profileArtisan.email,
						profileArtisan.description,
						profileArtisan.pictureAvatar,
						profileArtisan.pictureGalery,
						profileArtisan.phone
					)
				);
				dispatch(artisanData(1, tokenEmail));
				break;

			case 'user':
				dispatch(editUser(profileUser));
				dispatch(userSingle(tokenEmail));
				break;
		}
	};

	return (
		<div>
			<Button className="buttons button-save" onClick={handleSaveClick} htmlType="submit">
				Sauvegarder
			</Button>
		</div>
	);
};

ButtonSaveAccount.propTypes = {
	profileRole: PropTypes.string.isRequired,
	profileArtisan: PropTypes.object,
	artisanEdit: PropTypes.func,
	artisanData: PropTypes.func,
	profileUser: PropTypes.object,
	editUser: PropTypes.func,
	userSingle: PropTypes.func
};

export default ButtonSaveAccount;
