import React, { useState, useEffect } from 'react';
import { Form, Icon, Input, Button, Modal } from 'antd';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import 'antd/dist/antd.css';

import './style.sass';
import { sendLogin } from 'src/store/register/actions';

const FormLogin = ({ handleCancel, modalLogin, connectVisible, setConnectVisible }) => {
	const [ email, setEmail ] = useState('');
	const [ password, setPassword ] = useState('');
	const connect = useSelector((state) => state.connect);
	const dispatch = useDispatch();

	const mailChangeValue = (event) => {
		//console.log(event.target.value);
		setEmail(event.target.value);
	};
	//console.log(email);
	const passwordChangeValue = (event) => {
		//console.log(event.target.value);
		setPassword(event.target.value);
	};

	const handleSubmitLogin = (email, password) => {
		return (event) => {
			event.preventDefault();

			dispatch(sendLogin(email, password));
		};
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
				<Form method="POST" onSubmit={handleSubmitLogin(email, password)}>
					<Form.Item>
						<Input
							onChange={mailChangeValue}
							prefix={<Icon type="mail" style={{ color: 'rgba(0,0,0,.25)' }} />}
							placeholder="Email"
							required
						/>
						<Input
							onChange={passwordChangeValue}
							prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
							type="password"
							placeholder="Mot de passe"
							required
						/>
						<Link className="login-form-forgot" to="/mot-de-passe-oublié" onClick={handleCancel}>
							Mot de passe oublié
						</Link>
					</Form.Item>
					<ButtonLogin />
				</Form>
			</Modal>
			<Modal visible={connectVisible} onCancel={closeModalWelcome} footer={null}>
				<p>Bonjour vous êtes connecté</p>
			</Modal>
		</div>
	);
};

export default FormLogin;
