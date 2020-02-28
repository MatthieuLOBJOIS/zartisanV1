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

	//console.log('ussser', userSelect);

	const [ profileUser, setProfileUser ] = useState({
		pictureAvatar: '',
		nickname: '',
		firstname: '',
		lastname: '',
		phone: '',
		mail: ''
	});

	useEffect(
		() => {
			setProfileUser({
				pictureAvatar: data.picture,
				nickname: data.nickname,
				firstname: data.firstname,
				lastname: data.lastname,
				phone: data.phone,
				mail: data.email
			});
		},
		[ userSelect ]
	);

	//console.log(profileUser);

	return (
		<div>
			<Row type="flex" justify="space-around" align="middle">
				{useLoading() == false && data != null ? (
					<FormEditUser profileUser={profileUser} setProfileUser={setProfileUser} />
				) : (
					<Loader />
				)}
			</Row>
		</div>
	);
};

export default ProfileSettingsUser;
