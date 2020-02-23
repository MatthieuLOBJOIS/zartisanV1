/**
 * Imports of dependencies
 */
import React, { useState, useEffect } from 'react';
import { Form, Input, Row, Button, Modal } from 'antd';
import { useDispatch, useSelector } from 'react-redux';

/**
 * Local imports
 */
import './style.sass';
import { sendRegisterArtisan } from 'src/store/register/actions';
import { sendRegisterUser } from 'src/store/register/actions';

const FormRegister = ({ registerState, setRegisterState }) => {
	const dispatch = useDispatch();
	const [ email, setEmail ] = useState('');
	const [ password, setPassword ] = useState('');
	const [ passwordCheck, setPasswordCheck ] = useState('');
	const [ siret, setSiret ] = useState('');

	const emailChangeValue = (event) => {
		setEmail(event.target.value);
	};

	const passwordChangeValue = (event) => {
		setPassword(event.target.value);
	};

	const passwordCheckChangeValue = (event) => {
		setPasswordCheck(event.target.value);
	};

	const siretChangeValue = (event) => {
		setSiret(event.target.value);
	};

	const handleFormArtisan = (email, password, passwordCheck, siret) => {
		return (event) => {
			//console.log(email, password, passwordCheck);
			event.preventDefault();
			if (password === passwordCheck && password !== '') {
				console.log('mots est correct');
				if (registerState.role === 'Artisan') {
					dispatch(sendRegisterArtisan(email, password, siret));
				}
				if (registerState.role === 'Particulier') {
					dispatch(sendRegisterUser(email, password));
				}
				hideModalRegister();
			}
		};
	};

	const hideModalRegister = () => {
		setTimeout(() => {
			setRegisterState({ ...registerState, ...{ visible: false } }), 2000;
		});
		//console.log('handle cancel');
	};

	const registerModalVisible = () => {
		setRegisterState({ ...registerState, ...{ valid: true } });
	};

	const registerModalClose = () => {
		setRegisterState({ ...registerState, ...{ valid: false } });
	};

	const registerOk = useSelector((state) => state.connect);

	useEffect(
		() => {
			if (registerOk === 'register') {
				registerModalVisible();
				console.log('lol');
			}
		},
		[ registerOk ]
	);

	return (
		<div className="register-artisan">
			<Row type="flex" justify="space-around" align="middle">
				<Modal
					footer={null}
					title={`Inscription ${registerState.role}`}
					visible={registerState.visible}
					onCancel={hideModalRegister}
				>
					<Form className="artisan-form" onSubmit={handleFormArtisan(email, password, passwordCheck, siret)}>
						{registerState.role === 'Artisan' && (
							<Form.Item label="Siret">
								<Input onChange={siretChangeValue} />
							</Form.Item>
						)}
						<Form.Item label="E-mail">
							<Input onChange={emailChangeValue} />
						</Form.Item>
						<Form.Item label="Mot de passe" hasFeedback>
							<Input.Password onChange={passwordChangeValue} />
						</Form.Item>
						<Form.Item label="Confirmer votre mots de passe" hasFeedback>
							<Input.Password onChange={passwordCheckChangeValue} />
						</Form.Item>
						<Form.Item>
							<Button type="primary" className="buttons" htmlType="submit">
								Confirmer
							</Button>
						</Form.Item>
					</Form>
				</Modal>
				<Modal visible={registerState.valid} onCancel={registerModalClose} footer={null}>
					<p>
						Votre inscription a été prie en compte, une demande de validation vous a été envoyé par mail, à
						très vite sur Z'artisan
					</p>
				</Modal>
			</Row>
		</div>
	);
};

export default FormRegister;
