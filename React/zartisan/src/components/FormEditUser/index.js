import React from 'react';
import { Form, Input, Button } from 'antd';
import UploadAvatar from 'src/components/UploadAvatar';
import 'antd/dist/antd.css';

const FormEditUser = ({ profileUser }) => {
	console.log('form', profileUser);
	return (
		<Form className="artisan-form">
			<Form.Item>
				<UploadAvatar pictureUser={profileUser.pictureAvatar} />
			</Form.Item>

			<Form.Item label="Pseudo" hasFeedback>
				<Input placeholder="Pseudo" value={profileUser.nickname} />
			</Form.Item>

			<Form.Item label="Nom" hasFeedback>
				<Input placeholder="Nom" value={profileUser.lastname} />
			</Form.Item>

			<Form.Item label="Prénom" hasFeedback>
				<Input placeholder="Prénom" value={profileUser.firstname} />
			</Form.Item>

			<Form.Item label="Téléphone" hasFeedback>
				<Input placeholder="Téléphone" value={profileUser.phone} />
			</Form.Item>

			<Form.Item label="Mail" hasFeedback>
				<Input placeholder="Mail" value={profileUser.mail} />
			</Form.Item>

			<Form.Item>
				<Button type="primary" className="buttons" htmlType="submit">
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
