//Imports of dependencies
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Row, Button, Modal } from 'antd';

//Local imports
//Components
import FormRegister from 'src/components/FormRegister';

//Components use for components "Header" : Display a modal
const ModalGoToFormUserOrArtisan = ({ modalRegister, setModalRegister }) => {
	//Hooks
	const [ registerState, setRegisterState ] = useState({
		visible: false,
		valid: false,
		role: ''
	});

	const handleCancel = () => {
		setModalRegister(false);
	};

	const showModalRegisterArtisan = () => {
		setRegisterState({ ...registerState, ...{ visible: true }, ...{ role: 'Artisan' } });
	};

	const showModalRegisterUser = () => {
		setRegisterState({ ...registerState, ...{ visible: true }, ...{ role: 'Particulier' } });
	};

	//button for navigate towards form register artisan/user (use withRouter for manage history url)
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
			<FormRegister registerState={registerState} setRegisterState={setRegisterState} />
		</div>
	);
};

//PropTypes
ModalGoToFormUserOrArtisan.propTypes = {
	modalRegister: PropTypes.bool.isRequired,
	setModalRegister: PropTypes.func.isRequired
};

export default ModalGoToFormUserOrArtisan;
