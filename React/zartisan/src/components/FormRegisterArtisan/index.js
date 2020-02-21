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
import { sendRegisterArtisan } from 'src/store/register/actions';

const FormRegisterArtisan = ({ registerVisibleArtisan, setRegisterVisibleArtisan }) => {
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
				dispatch(sendRegisterArtisan(email, password, siret));
				hideModalRegisterArtisan();
			}
		};
	};

	const hideModalRegisterArtisan = () => {
		setTimeout(() => {
			setRegisterVisibleArtisan(false), 2000;
		});
		//console.log('handle cancel');
	};

	return (
		<div className="register-artisan">
			<Row type="flex" justify="space-around" align="middle">
				<Modal
					footer={null}
					title="Inscription Artisan"
					visible={registerVisibleArtisan}
					onCancel={hideModalRegisterArtisan}
				>
					<Form className="artisan-form" onSubmit={handleFormArtisan(email, password, passwordCheck, siret)}>
						<Form.Item label="Siret">
							<Input onChange={siretChangeValue} />
						</Form.Item>
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
			</Row>
		</div>
	);
};

export default FormRegisterArtisan;
