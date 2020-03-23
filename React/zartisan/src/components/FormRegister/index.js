//Imports of dependencies
import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { Form, Input, Row, Button, Modal } from 'antd';

//Local imports
import { sendRegisterArtisan } from 'src/store/register/actions';
import { sendRegisterUser } from 'src/store/register/actions';
import './style.sass';

//Components use for components "Header" : Display a form register
const FormRegister = ({ registerState, setRegisterState }) => {
	//Hooks
	const dispatch = useDispatch();
	const registerOk = useSelector((state) => state.connect);

	const [ email, setEmail ] = useState({ value: '', status: '', help: '' });
	const [ password, setPassword ] = useState({ value: '', status: '', help: '' });
	const [ passwordCheck, setPasswordCheck ] = useState({ value: '', status: '', help: '' });
	const [ siret, setSiret ] = useState({ value: '', status: '', help: '' });

	//If register request is valid display a modal of welcome
	useEffect(
		() => {
			if (registerOk === 'register') {
				registerModalVisible();
			}
		},
		[ registerOk ]
	);

	//Event handle onChange that detect every value change on the input and update local state
	const emailChangeValue = (event) => {
		setEmail({ ...email, ...{ value: event.target.value } });
	};

	const passwordChangeValue = (event) => {
		setPassword({ ...password, ...{ value: event.target.value } });
	};

	const passwordCheckChangeValue = (event) => {
		setPasswordCheck({ ...passwordCheck, ...{ value: event.target.value } });
	};

	const siretChangeValue = (event) => {
		setSiret({ ...siret, ...{ value: event.target.value } });
	};

	//Validat the different value and display a error/warning or success message
	//If is success trigger a action for creat the account
	const validateForm = () => {
		const passwordFormat = /[a-zA-Z0-9]{6}/;
		const mailFormat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
		const siretFormat = /[0-9]{14}/;

		if (email.value == '') {
			setEmail({ ...email, ...{ status: 'warning' }, ...{ help: 'Veuillez indiquer email' } });
		} else if (email.value.match(mailFormat)) {
			setEmail({ ...email, ...{ status: 'success' }, ...{ help: '' } });
		} else {
			setEmail({
				...email,
				...{ status: 'error' },
				...{ help: 'Email invalide' }
			});
		}

		if (siret.value == '') {
			setSiret({ ...siret, ...{ status: 'warning' }, ...{ help: '' } });
		} else if (siret.value.match(siretFormat)) {
			setSiret({ ...siret, ...{ status: 'success' }, ...{ help: '' } });
		} else {
			setSiret({
				...siret,
				...{ status: 'error' },
				...{ help: 'Siret invalide' }
			});
		}

		if (password.value == '') {
			setPassword({ ...password, ...{ status: 'warning' }, ...{ help: '' } });
		} else if (password.value.match(passwordFormat)) {
			setPassword({ ...password, ...{ status: 'success' }, ...{ help: '' } });
		} else {
			setPassword({
				...password,
				...{ status: 'error' },
				...{ help: 'Mot de passe invalide' }
			});
		}

		if (passwordCheck.value == '') {
			setPasswordCheck({ ...passwordCheck, ...{ status: 'warning' }, ...{ help: '' } });
		} else if (passwordCheck.value == password.value) {
			setPasswordCheck({ ...passwordCheck, ...{ status: 'success' }, ...{ help: '' } });
		} else {
			setPasswordCheck({
				...passwordCheck,
				...{ status: 'error' },
				...{ help: 'Siret invalide' }
			});
		}

		if (
			registerState.role === 'Artisan' &&
			email.value.match(mailFormat) &&
			siret.value.match(siretFormat) &&
			password.value.match(passwordFormat) &&
			passwordCheck.value == password.value
		) {
			dispatch(sendRegisterArtisan(email.value, password.value, siret.value));
			hideModalRegister();
		}

		if (
			registerState.role === 'Particulier' &&
			email.value.match(mailFormat) &&
			password.value.match(passwordFormat) &&
			passwordCheck.value == password.value
		) {
			dispatch(sendRegisterUser(email.value, password.value));
			hideModalRegister();
		}
	};

	//Event handle onSubmit : trigger the function validatForm() after submit
	const handleFormArtisan = (event) => {
		event.preventDefault();
		validateForm();
	};

	//Close the modal register after validat request
	const hideModalRegister = () => {
		setTimeout(() => {
			setRegisterState({ ...registerState, ...{ visible: false } }), 2000;
			setEmail({ ...email, ...{ value: '' }, ...{ status: '' }, ...{ help: '' } });
			setSiret({ ...siret, ...{ value: '' }, ...{ status: '' }, ...{ help: '' } });
			setPassword({ ...password, ...{ value: '' }, ...{ status: '' }, ...{ help: '' } });
			setPasswordCheck({ ...passwordCheck, ...{ value: '' }, ...{ status: '' }, ...{ help: '' } });
		});
	};

	//Display modal welcome
	const registerModalVisible = () => {
		setRegisterState({ ...registerState, ...{ valid: true } });
	};

	//Close modal welcome
	const registerModalClose = () => {
		setRegisterState({ ...registerState, ...{ valid: false } });
	};

	return (
		<div className="register-artisan">
			<Row type="flex" justify="space-around" align="middle">
				<Modal
					footer={null}
					title={`Inscription ${registerState.role}`}
					visible={registerState.visible}
					onCancel={hideModalRegister}
				>
					<Form className="artisan-form" onSubmit={handleFormArtisan}>
						{registerState.role === 'Artisan' && (
							<Form.Item label="Siret" hasFeedback validateStatus={siret.status} help={siret.help}>
								<Input value={siret.value} onChange={siretChangeValue} />
							</Form.Item>
						)}
						<Form.Item label="E-mail" hasFeedback validateStatus={email.status} help={email.help}>
							<Input value={email.value} onChange={emailChangeValue} />
						</Form.Item>
						<Form.Item
							label="Mot de passe"
							hasFeedback
							validateStatus={password.status}
							help={password.help}
						>
							<Input.Password value={password.value} onChange={passwordChangeValue} />
						</Form.Item>
						<Form.Item
							label="Confirmer votre mots de passe"
							hasFeedback
							validateStatus={passwordCheck.status}
							help={passwordCheck.help}
						>
							<Input.Password value={passwordCheck.value} onChange={passwordCheckChangeValue} />
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

//PropTypes
FormRegister.propTypes = {
	registerState: PropTypes.object.isRequired,
	setRegisterState: PropTypes.func.isRequired
};

export default FormRegister;
