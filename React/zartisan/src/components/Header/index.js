/**
 * Imports of dependencies
 */

import React, { useState, useEffect } from 'react';
import { Row, Col, Button, Icon, Drawer, Typography, Modal } from 'antd';
import 'antd/dist/antd.css';
import { Link, withRouter } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { sendLogin, deconnect } from 'src/store/register/actions';

/**
 * Local imports
 */
import './style.sass';
import logo from './picture/logo-zartisan.svg';
import FormLogin from 'src/components/FormLogin';

/**
 * Code
 */
const { Text } = Typography;

const Header = () => {
	const connect = useSelector((state) => state.connect);
	const dispatch = useDispatch();
	//console.log(connect);

	/**Hooks for display or not menu burger */
	const [ visible, setVisible ] = useState(false);

	/**Hooks for display or not modal login */
	const [ modalLogin, setModalLogin ] = useState(false);

	/**Hooks for display or not modal register */
	const [ modalRegister, setModalRegister ] = useState(false);

	/**Hooks welcome */
	const [ connectVisible, setConnectVisible ] = useState(false);

	/**
   * open menu burger
   */
	const showDrawer = () => {
		setVisible(true);
	};

	/**
   * close menu burger
   */
	const onClose = () => {
		setVisible(false);
	};
	/**
   * open form login popup and close menu burger
   */
	const showModalLogin = () => {
		setModalLogin(true);
		onClose();
	};
	const connectModalVisible = () => {
		setConnectVisible(true);
	};

	/**
   * open form register popup and close menu burger
   */
	const showModalRegister = () => {
		setModalRegister(true);
		onClose();
	};
	/**
   * close form popup
   */
	const handleCancel = () => {
		setModalRegister(false);
		setModalLogin(false);
	};

	const closeModalWelcome = () => {
		setConnectVisible(false);
	};

	const deconnexion = () => {
		onClose();
		dispatch(deconnect());
	};

	//const handleSubmitLogin allows to send an axios request
	const handleSubmitLogin = (email, password) => {
		return (event) => {
			event.preventDefault();
			dispatch(sendLogin(email, password));
		};
	};

	// Close modalFormLogin after check_login valid, and value connect:true

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

	/**
   * button for navigate towards form register artisan (use withRouter for manage history url)
   */
	const ButtonGoToArtisanForm = withRouter(({ history }) => {
		return (
			<Button id="buttons"
				onClick={() => {
					handleCancel();
					return history.push('/inscription/professionnel');
				}}
				style={{ width: '40%', margin: '1.5em' }}
			>
				Professionnel
			</Button>
		);
	});

	/**
   * button for navigate towards form register user (use withRouter for manage history url)
   */
	const ButtonGoToUserForm = withRouter(({ history }) => {
		return (
			<Button id="buttons"
				onClick={() => {
					handleCancel();
					return history.push('/inscription/particulier');
				}}
				style={{ width: '40%' }}
			>
				Particulier
			</Button>
		);
	});

	return (
		<div id="zheader">
			<Row className="header" type="flex" justify="space-around">
				<Col span={24}>
					<Col span={6}>
						{/** Button Burger */}
						<Button className="header-burger-button" id="burger" onClick={showDrawer}>
							<Icon type="menu" />
						</Button>

						{/** Menu of Burger */}
						<Drawer placement="top" closable={true} onClose={onClose} visible={visible}>
							<Row type="flex" justify="center" align="top">
								<img src={logo} alt="zartisan image" className="logo-zartisan" />
							</Row>
							<Row type="flex" justify="center" style={{ margin: '1.5em' }} align="top">
								<Text>
									{connect === false && (
										<a href="#" onClick={showModalLogin}>
											Connexion
										</a>
									)}
									<Modal footer={null} title="Connexion" visible={modalLogin} onCancel={handleCancel}>
										<FormLogin handleSubmitLogin={handleSubmitLogin} />
									</Modal>
									<Modal visible={connectVisible} onCancel={closeModalWelcome} footer={null}>
										<p>Bonjour vous êtes connecté</p>
									</Modal>

									{connect === true && <a href="#">Profil</a>}
								</Text>
							</Row>
							<Row type="flex" justify="center" align="top">
								{connect === false && (
									<a href="#" onClick={showModalRegister}>
										Inscription
									</a>
								)}
								{connect === true && <a onClick={deconnexion}>Deconnexion</a>}

								<Modal
									footer={null}
									title="Inscription"
									visible={modalRegister}
									onCancel={handleCancel}
								>
									<Row type="flex" justify="center" align="top">
										<ButtonGoToUserForm />
									</Row>
									<Row type="flex" justify="center" align="top">
										<ButtonGoToArtisanForm />
									</Row>
								</Modal>
							</Row>
						</Drawer>
					</Col>

					{/** logo header */}
					<Col span={18}>
						<Link to="/">
							<img src={logo} alt="zartisan image" className="logo-zartisan" />
						</Link>
					</Col>
				</Col>
			</Row>
		</div>
	);
};

export default Header;
