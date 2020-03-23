//Imports of dependencies
import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import 'antd/dist/antd.css';
import { Form, Icon, Input, Button, Modal, Alert } from 'antd';

//Local imports
import { sendLogin } from 'src/store/register/actions';
import './style.sass';

//Components use for components "Header" : Display a form login
const FormLogin = ({ setModalLogin, modalLogin, connectVisible, setConnectVisible }) => {
	//Hooks
	const [ email, setEmail ] = useState({ value: '', status: '', help: '' });
	const [ password, setPassword ] = useState({ value: '', status: '', help: '' });
	const connect = useSelector((state) => state.connect);
	const dispatch = useDispatch();

	const handleCancel = () => {
		setModalLogin(false);
	};

	const connectModalVisible = () => {
		setConnectVisible(true);
	};

	const closeModalWelcome = () => {
		setConnectVisible(false);
	};

	useEffect(
		() => {
			if (connect === true) {
				handleCancel();
				connectModalVisible();
				setTimeout(closeModalWelcome, 2000);
			}
		},
		[ connect ]
	);

	//Event handle onChange that detect every value change on the input and update local state
	const mailChangeValue = (event) => {
		setEmail({ ...email, ...{ value: event.target.value } });
	};
	const passwordChangeValue = (event) => {
		setPassword({ ...password, ...{ value: event.target.value } });
	};

	//Event handle onSubmit: send email and password and trigger a action that send a request
	const handleSubmitLogin = (email, password) => {
		return (event) => {
			event.preventDefault();

			dispatch(sendLogin(email, password));
		};
	};

	const ButtonLogin = () => {
		return (
			<Button
				type="default"
				className="buttons"
				htmlType="submit"
				className="login-form-button"
				style={{ color: 'white', background: '#bb9574' }}
			>
				Se connecter
			</Button>
		);
	};

	return (
		<div>
			<Modal footer={null} title="Connexion" visible={modalLogin} onCancel={handleCancel}>
				<Form method="POST" onSubmit={handleSubmitLogin(email.value, password.value)}>
					<Form.Item label="E-mail" hasFeedback validateStatus={email.status} help={email.help}>
						<Input
							onChange={mailChangeValue}
							prefix={<Icon type="mail" style={{ color: 'rgba(0,0,0,.25)' }} />}
							placeholder="Email"
							required
						/>
					</Form.Item>
					<Form.Item label="Mot de passe" hasFeedback validateStatus={password.status} help={password.help}>
						<Input
							onChange={passwordChangeValue}
							prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
							type="password"
							placeholder="Mot de passe"
							required
						/>
					</Form.Item>
					<Form.Item>
						<Link className="login-form-forgot" to="/mot-de-passe-oublié" onClick={handleCancel}>
							Mot de passe oublié
						</Link>
					</Form.Item>

					<ButtonLogin />
				</Form>
				{connect == 'fail' && (
					<Alert
						message="Alerte"
						description="L'email ou le mot de passe est incorrect"
						type="error"
						showIcon
					/>
				)}
			</Modal>
			<Modal visible={connectVisible} onCancel={closeModalWelcome} footer={null}>
				<p>Bonjour vous êtes connecté</p>
			</Modal>
		</div>
	);
};

//PropTypes
FormLogin.propTypes = {
	setModalLogin: PropTypes.func.isRequired,
	modalLogin: PropTypes.bool.isRequired,
	connectVisible: PropTypes.bool.isRequired,
	setConnectVisible: PropTypes.func.isRequired
};

export default FormLogin;
