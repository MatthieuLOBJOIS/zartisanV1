//Imports of dependencies
import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import 'antd/dist/antd.css';
import { Row } from 'antd';

//Local imports
import { useLoading } from 'src/hooks/useLoading';
import './style.sass';

//Components
import FormEditUser from 'src/components/FormEditUser';
import Loader from 'src/components/Loader';

//Components content of page profile user
const ProfileSettingsUser = () => {
	//Hooks
	const userSelect = useSelector((state) => state.user);
	let toLoading = useLoading();

	const [ profileUser, setProfileUser ] = useState({
		pictureAvatar: '',
		nickname: '',
		firstname: '',
		lastname: '',
		phone: '',
		mail: ''
	});

	//Creat session for account user
	if (userSelect != '') {
		sessionStorage.setItem('ProfileUser', JSON.stringify(userSelect));
	}
	const sessionUser = JSON.parse(sessionStorage.getItem('ProfileUser'));

	useEffect(
		() => {
			if (sessionUser !== null) {
				setProfileUser({
					pictureAvatar: sessionUser.picture,
					nickname: sessionUser.nickname,
					firstname: sessionUser.firstname,
					lastname: sessionUser.lastname,
					phone: sessionUser.phone,
					mail: sessionUser.email
				});
			}
		},
		[ userSelect ]
	);

	return (
		<div className="profile-content-user">
			<Row type="flex" justify="space-around" align="middle">
				{sessionUser === null && toLoading === false ? (
					<Loader />
				) : (
					<FormEditUser profileUser={profileUser} setProfileUser={setProfileUser} />
				)}
			</Row>
		</div>
	);
};

export default ProfileSettingsUser;
