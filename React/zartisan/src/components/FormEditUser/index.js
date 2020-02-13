import React from 'react';
import { useDispatch } from 'react-redux';
import { Form, Input, Button } from 'antd';
import 'antd/dist/antd.css';

import UploadAvatar from 'src/components/UploadAvatar';
import { editUser } from 'src/store/user/actions';

const FormEditUser = ({ profileUser, setProfileUser }) => {
	//console.log('form', profileUser);
	const dispatch = useDispatch();

	const handleChangeValue = (keys) => {
		return (event) => {
			switch (keys) {
				case 'nickname':
					setProfileUser({
						...profileUser,
						...{ nickname: event.target.value }
					});
					break;
				case 'lastname':
					setProfileUser({
						...profileUser,
						...{ lastname: event.target.value }
					});
					break;
				case 'firstname':
					setProfileUser({
						...profileUser,
						...{ firstname: event.target.value }
					});
					break;
				case 'phone':
					setProfileUser({
						...profileUser,
						...{ phone: event.target.value }
					});
					break;
				case 'mail':
					setProfileUser({
						...profileUser,
						...{ mail: event.target.value }
					});
					break;
				default:
					console.log('Aucun changement');
			}
		};
	};

	const handleSaveEdit = () => {
		dispatch(editUser(profileUser));
	};

	return (
		<Form className="artisan-form">
			<Form.Item>
				<UploadAvatar profileUser={profileUser} setProfileUser={setProfileUser} />
			</Form.Item>

			<Form.Item label="Pseudo" hasFeedback>
				<Input placeholder="Pseudo" value={profileUser.nickname} onChange={handleChangeValue('nickname')} />
			</Form.Item>

			<Form.Item label="Nom" hasFeedback>
				<Input placeholder="Nom" value={profileUser.lastname} onChange={handleChangeValue('lastname')} />
			</Form.Item>

			<Form.Item label="Prénom" hasFeedback>
				<Input placeholder="Prénom" value={profileUser.firstname} onChange={handleChangeValue('firstname')} />
			</Form.Item>

			<Form.Item label="Téléphone" hasFeedback>
				<Input placeholder="Téléphone" value={profileUser.phone} onChange={handleChangeValue('phone')} />
			</Form.Item>

			<Form.Item label="Mail" hasFeedback>
				<Input placeholder="Mail" value={profileUser.mail} onChange={handleChangeValue('mail')} />
			</Form.Item>

			<Form.Item>
				<Button type="primary" className="buttons" htmlType="submit" onClick={handleSaveEdit}>
					Sauvegarder
				</Button>
			</Form.Item>
			<Form.Item>
				<Button type="danger" htmlType="submit">
					Supprimer le compte
				</Button>
			</Form.Item>
		</Form>
	);
};

export default FormEditUser;
