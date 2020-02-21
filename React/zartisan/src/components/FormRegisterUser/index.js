/**
 * Imports of dependencies
 */
import React, { useState } from 'react';
import { Form, Input, Row, Button, Modal } from 'antd';
import { useDispatch } from 'react-redux';

/**
 * Local imports
 */

import './style.sass';

const FormRegisterUser = ({ handleFormUser, registerVisibleUser, hideModalRegisterUser }) => {
	const dispatch = useDispatch();

	const [ email, setEmail ] = useState('');
	const [ password, setPassword ] = useState('');
	const [ passwordCheck, setPasswordCheck ] = useState('');

	const emailChangeValue = (event) => {
		setEmail(event.target.value);
	};

	const passwordChangeValue = (event) => {
		setPassword(event.target.value);
	};

	const passwordCheckChangeValue = () => {
		setPasswordCheck(event.target.value);
	};

	return (
		<div className="register-user">
			<Row type="flex" justify="space-around" align="middle">
				<Modal
					footer={null}
					title="Inscription Particulier"
					visible={registerVisibleUser}
					onCancel={hideModalRegisterUser}
				>
					<Form className="user-form" onSubmit={handleFormUser(email, password, passwordCheck)}>
						<Form.Item label="E-mail">
							<Input onChange={emailChangeValue} />
						</Form.Item>
						<Form.Item label="Mot de passe" hasFeedback>
							<Input.Password onChange={passwordChangeValue} />
						</Form.Item>
						<Form.Item label="Confirmer votre mot de passe" hasFeedback>
							<Input.Password onChange={passwordCheckChangeValue} />
						</Form.Item>
						<Form.Item>
							<Button type="primary" className="buttons" htmlType="submit">
								Confirmer
							</Button>
						</Form.Item>
					</Form>
				</Modal>
			</Row>
		</div>
	);
};

export default FormRegisterUser;
