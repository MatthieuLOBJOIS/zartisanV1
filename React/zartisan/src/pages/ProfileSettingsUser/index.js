import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Row } from 'antd';
import 'antd/dist/antd.css';
import FormEditUser from 'src/components/FormEditUser';

const ProfileSettingsUser = () => {
	const userSelect = useSelector((state) => state.user);

	//console.log('ussser', userSelect);

	const [ profileUser, setProfileUser ] = useState({
		pictureAvatar: userSelect.picture,
		nickname: userSelect.nickname,
		firstname: userSelect.lastname,
		phone: userSelect.phone,
		mail: userSelect.mail
	});

	return (
		<div>
			<Row type="flex" justify="space-around" align="middle">
				<FormEditUser />
			</Row>
		</div>
	);
};

export default ProfileSettingsUser;
