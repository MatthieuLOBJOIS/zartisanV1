/**
 * Imports of dependencies
 */
import React, { useState } from 'react';
import { Row, Button, Modal } from 'antd';

import FormRegisterArtisan from 'src/components/FormRegisterArtisan';
import FormRegisterUser from 'src/components/FormRegisterUser';
import { sendRegisterArtisan } from 'src/store/register/actions';
import { sendRegisterUser } from 'src/store/register/actions';

const ModalGoToFormUserOrArtisan = ({ modalRegister, handleCancel }) => {
	const [ registerVisibleArtisan, setRegisterVisibleArtisan ] = useState(false);
	const [ registerVisibleUser, setRegisterVisibleUser ] = useState(false);

	const showModalRegisterArtisan = () => {
		setRegisterVisibleArtisan(true), 2000;
	};

	const showModalRegisterUser = () => {
		setRegisterVisibleUser(true);
	};

	const hideModalRegisterArtisan = () => {
		setTimeout(() => {
			setRegisterVisibleArtisan(false), 2000;
		});
		//console.log('handle cancel');
	};

	const hideModalRegisterUser = () => {
		setTimeout(() => {
			setRegisterVisibleUser(false), 2000;
		});
		//console.log('handle cancel');
	};

	// handleForm
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

	const handleFormUser = (email, password, passwordCheck) => {
		return (event) => {
			//console.log(email, password, passwordCheck);
			event.preventDefault();
			if (password === passwordCheck && password !== '') {
				//console.log('mots est correct');
				dispatch(sendRegisterUser(email, password));
			}
			hideModalRegisterUser();
		};
	};

	/**
   * button for navigate towards form register artisan/user (use withRouter for manage history url)
   */

	const ButtonGoToArtisanForm = () => {
		return (
			<Button
				className="buttons"
				onClick={() => {
					handleCancel();

					showModalRegisterArtisan();
				}}
				style={{ width: '40%', margin: '1.5em' }}
			>
				Professionnel
			</Button>
		);
	};

	const ButtonGoToUserForm = () => {
		return (
			<Button
				className="buttons"
				onClick={() => {
					handleCancel();

					showModalRegisterUser();
				}}
				style={{ width: '40%' }}
			>
				Particulier
			</Button>
		);
	};

	return (
		<div>
			<Modal footer={null} title="Inscription" visible={modalRegister} onCancel={handleCancel}>
				<Row type="flex" justify="center" align="top">
					<ButtonGoToUserForm />
				</Row>
				<Row type="flex" justify="center" align="top">
					<ButtonGoToArtisanForm />
				</Row>
			</Modal>
			<FormRegisterUser
				handleFormUser={handleFormUser}
				registerVisibleUser={registerVisibleUser}
				hideModalRegisterUser={hideModalRegisterUser}
			/>
			<FormRegisterArtisan
				handleFormArtisan={handleFormArtisan}
				registerVisibleArtisan={registerVisibleArtisan}
				hideModalRegisterArtisan={hideModalRegisterArtisan}
			/>
		</div>
	);
};

export default ModalGoToFormUserOrArtisan;
