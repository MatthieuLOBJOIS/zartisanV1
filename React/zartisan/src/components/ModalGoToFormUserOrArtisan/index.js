/**
 * Imports of dependencies
 */
import React, { useState } from 'react';
import { Row, Button, Modal } from 'antd';

import FormRegisterArtisan from 'src/components/FormRegisterArtisan';
import FormRegisterUser from 'src/components/FormRegisterUser';

const ModalGoToFormUserOrArtisan = ({ modalRegister, handleCancel }) => {
	const [ registerVisibleArtisan, setRegisterVisibleArtisan ] = useState(false);
	const [ registerVisibleUser, setRegisterVisibleUser ] = useState(false);

	const showModalRegisterArtisan = () => {
		setRegisterVisibleArtisan(true), 2000;
	};

	const showModalRegisterUser = () => {
		setRegisterVisibleUser(true);
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
				setRegisterVisibleUser={setRegisterVisibleUser}
				registerVisibleUser={registerVisibleUser}
			/>
			<FormRegisterArtisan
				setRegisterVisibleArtisan={setRegisterVisibleArtisan}
				registerVisibleArtisan={registerVisibleArtisan}
			/>
		</div>
	);
};

export default ModalGoToFormUserOrArtisan;
