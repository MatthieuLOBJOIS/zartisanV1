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

const FormRegister = ({ registerState, setRegisterState, reset }) => {
	const dispatch = useDispatch();
	const [ email, setEmail ] = useState('');
	const [ password, setPassword ] = useState('');
	const [ passwordCheck, setPasswordCheck ] = useState('');
	const [ siret, setSiret ] = useState('');
	const [ validInput, setValidInput ] = useState({
		statusSiret: '',
		helpSiret: '',
		statusEmail: '',
		helpEmail: '',
		statusPassword: '',
		helpPassword: '',
		statusPasswordCheck: '',
		helpPasswordCheck: ''
	});

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
			const mailFormat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
			const siretFormat = /[0-9]{14}/;
			const passwordFormat = /[a-zA-Z0-9]{6}/;

			if (email.match(mailFormat)) {
				//setRegisterState({ ...registerState, ...{ status: 'success' }, ...{ help: '' } });
				setValidInput({ ...validInput, ...{ statusEmail: 'success' }, ...{ helpEmail: '' } });
			} else {
				//setRegisterState({ ...registerState, ...{ status: 'error' }, ...{ help: 'Email invalide' } });
				setValidInput({ ...validInput, ...{ statusEmail: 'error' }, ...{ helpEmail: 'Email invalide' } });
				console.log('email', validInput);
			}

			if (siret.match(siretFormat)) {
				//setRegisterState({ ...registerState, ...{ status: 'success' }, ...{ help: '' } });
				setValidInput({ ...validInput, ...{ statusSiret: 'success' }, ...{ helpSiret: '' } });
			} else {
				//setRegisterState({ ...registerState, ...{ status: 'error' }, ...{ help: 'Email invalide' } });
				setValidInput({ ...validInput, ...{ statusSiret: 'error' }, ...{ helpSiret: 'Siret invalide' } });
				console.log('email', validInput);
			}

			// if (password.match(passwordFormat)) {
			// 	//setRegisterState({ ...registerState, ...{ status: 'success' }, ...{ help: '' } });
			// 	setValidInput({ ...validInput, ...{ statusPassword: 'success' }, ...{ helpPassword: '' } });
			// } else {
			// 	//setRegisterState({ ...registerState, ...{ status: 'error' }, ...{ help: 'Email invalide' } });
			// 	setValidInput({
			// 		...validInput,
			// 		...{ statusPassword: 'error' },
			// 		...{ helpPassword: 'Password invalide' }
			// 	});
			// }

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
							<Form.Item
								label="Siret"
								hasFeedback
								validateStatus={validInput.statusSiret}
								help={validInput.helpSiret}
							>
								<Input onChange={siretChangeValue} />
							</Form.Item>
						)}
						<Form.Item
							label="E-mail"
							hasFeedback
							validateStatus={validInput.statusEmail}
							help={validInput.helpEmail}
						>
							<Input onChange={emailChangeValue} />
						</Form.Item>
						<Form.Item
							label="Mot de passe"
							hasFeedback
							validateStatus={validInput.statusPassword}
							help={validInput.helpPassword}
						>
							<Input.Password onChange={passwordChangeValue} />
						</Form.Item>
						<Form.Item
							label="Confirmer votre mots de passe"
							hasFeedback
							validateStatus={validInput.statusPasswordCheck}
							help={validInput.helpPasswordCheck}
						>
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
