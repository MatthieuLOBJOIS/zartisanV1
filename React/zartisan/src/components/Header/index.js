/**
 * Imports of dependencies
 */

import React, { useState } from 'react';
import { Row, Col, Button, Icon, Drawer, Typography } from 'antd';
import 'antd/dist/antd.css';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import cookies from 'js-cookie';

/**
 * Local imports
 */
import './style.sass';
import logo from './picture/logo-zartisan.svg';
import FormLogin from 'src/components/FormLogin';
import ModalGoToFormUserOrArtisan from 'src/components/ModalGoToFormUserOrArtisan';
import { artisanData } from 'src/store/artisan/actions';
import { NAME_SERVER } from 'src/store/register/actions';
import { userSingle } from 'src/store/user/actions';
import { deconnect } from 'src/store/register/actions';
/**
 * Code
 */
const { Text } = Typography;
const Header = () => {
	const connect = useSelector((state) => state.connect);
	const dispatch = useDispatch();

	/**Hooks for display or not menu burger */
	const [ visible, setVisible ] = useState(false);
	/**Hooks for display or not modal login */
	const [ modalLogin, setModalLogin ] = useState(false);
	/**Hooks for display or not modal register */
	const [ modalRegister, setModalRegister ] = useState(false);
	/**Hooks welcome */
	const [ connectVisible, setConnectVisible ] = useState(false);

	//open menu burger
	const showDrawer = () => {
		setVisible(true);
	};

	//close menu burger
	const onClose = () => {
		setVisible(false);
	};

	const showModalLogin = () => {
		onClose();
		setTimeout(() => {
			setModalLogin(true);
		}, 1000);
	};

	const showModalRegister = () => {
		onClose();
		setTimeout(() => {
			setModalRegister(true);
		}, 1000);
	};

	const handleCancel = () => {
		setModalRegister(false);
		setModalLogin(false);
	};

	const deconnexion = () => {
		onClose();
		dispatch(deconnect());
	};

	let token = cookies.get('TOKEN');
	let parseJwt = (token) => {
		try {
			return JSON.parse(atob(token.split('.')[1]));
		} catch (e) {
			return null;
		}
	};

	let admin = -1;
	let user = -1;
	let artisanUser = -1;
	let tokenEmail = '';
	if (token != null) {
		admin = parseJwt(token).roles.indexOf('ROLE_ADMIN');
		user = parseJwt(token).roles.indexOf('ROLE_USER');
		artisanUser = parseJwt(token).roles.indexOf('ROLE_ARTISAN');
		tokenEmail = parseJwt(token).username;
	}

	const handleClickProfileArtisan = () => {
		dispatch(artisanData(1, tokenEmail));
		onClose();
	};

	const handleClickProfileUser = () => {
		dispatch(userSingle(tokenEmail));
		onClose();
	};

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
						<Drawer placement="top" onClose={onClose} visible={visible} closable={true}>
							<Row type="flex" justify="center" align="top">
								<img src={logo} alt="zartisan image" className="logo-zartisan" />
							</Row>
							<Row type="flex" justify="center" align="top">
								<Text>
									{(connect === false || connect === 'register') && (
										<a href="#" onClick={showModalLogin}>
											Connexion
										</a>
									)}
									<FormLogin
										handleCancel={handleCancel}
										modalLogin={modalLogin}
										connectVisible={connectVisible}
										setConnectVisible={setConnectVisible}
									/>
									{connect === true && admin === -1 ? connect === true && artisanUser !== -1 ? (
										<Link to="/profil/artisan" onClick={handleClickProfileArtisan}>
											Profil
										</Link>
									) : (
										<Link to="/profil/particulier" onClick={handleClickProfileUser}>
											Profil
										</Link>
									) : (
										''
									)}
									{connect === true && admin !== -1 ? (
										<a href={`${NAME_SERVER}/admin`}>Admin </a>
									) : (
										''
									)}
								</Text>
							</Row>
							<Row type="flex" justify="center" align="top">
								{(connect === false || connect === 'register') && (
									<a href="#" onClick={showModalRegister}>
										Inscription
									</a>
								)}
								{connect === true && <a onClick={deconnexion}>Deconnexion</a>}

								<ModalGoToFormUserOrArtisan modalRegister={modalRegister} handleCancel={handleCancel} />
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
