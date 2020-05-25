//Imports of dependencies
import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import cookies from 'js-cookie';
import { Button, message } from 'antd';
import { artisanSaveSuccess } from 'src/store/artisan/actions';
import { userSaveSuccess } from 'src/store/user/actions';

//Local imports
import './style.sass';

//Components for page "ProfileSettingsUser and ProfileSettingsArtisan" : save update account.
const ButtonSaveAccount = ({
	profileRole,
	profileArtisan,
	artisanEdit,
	artisanData,
	profileUser,
	editUser,
	userSingle
}) => {
	//Hooks
	const dispatch = useDispatch();
	const saveArtisan = useSelector((state) => state.artisan.saveArtisan);
	const saveUser = useSelector((state) => state.user.saveUser);
	const success = () => {
		message.success('Les modifications ont été sauvegardées');
	};

	useEffect(
		() => {
			if (saveArtisan === true || saveUser === true) {
				success();
				dispatch(artisanSaveSuccess(null));
				dispatch(userSaveSuccess(null));
			}
		},
		[ saveArtisan, saveUser ]
	);
	//tokenJWT: parse the token for read the data token
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

	//Event handle onClick trigger a action for save update account
	const handleSaveClick = () => {
		//console.log(profileRole, 'test');

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

//PropTypes
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
