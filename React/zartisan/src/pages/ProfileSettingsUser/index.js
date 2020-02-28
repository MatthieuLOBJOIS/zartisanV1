import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Row } from 'antd';
import 'antd/dist/antd.css';
import FormEditUser from 'src/components/FormEditUser';
import Loader from 'src/components/Loader';
import { useLoading } from 'src/hooks/loading';

const ProfileSettingsUser = () => {
	const userSelect = useSelector((state) => state.user);
	const data = JSON.parse(sessionStorage.getItem('userProfile'));
	let objUser = '';

	if (data != null) {
		objUser = data;
	}

	const [ profileUser, setProfileUser ] = useState({
		pictureAvatar: '',
		nickname: '',
		firstname: '',
		lastname: '',
		phone: '',
		mail: ''
	});
	//console.log('ussser', userSelect, data, profileUser);

	useEffect(
		() => {
			setProfileUser({
				pictureAvatar: objUser.picture,
				nickname: objUser.nickname,
				firstname: objUser.firstname,
				lastname: objUser.lastname,
				phone: objUser.phone,
				mail: objUser.email
			});
		},
		[ userSelect ]
	);

	//console.log(profileUser);
	//console.log('obj', objUser);
	return (
		<div>
			<Row type="flex" justify="space-around" align="middle">
				{useLoading() == false && objUser != '' ? (
					<FormEditUser profileUser={profileUser} setProfileUser={setProfileUser} />
				) : (
					<Loader />
				)}
			</Row>
		</div>
	);
};

export default ProfileSettingsUser;
