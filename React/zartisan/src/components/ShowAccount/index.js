import React, { useEffect, useState } from 'react';
import { Row, Col, Button, Icon, Drawer, Typography } from 'antd';

import FormLogin from 'src/components/FormLogin';
import ModalGoToFormUserOrArtisan from 'src/components/ModalGoToFormUserOrArtisan';
import { artisanData } from 'src/store/artisan/actions';
import { NAME_SERVER } from 'src/store/register/actions';
import { userSingle } from 'src/store/user/actions';
import { deconnect } from 'src/store/register/actions';
import { Link, useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import classNames from 'classnames';
import cookies from 'js-cookie';
import './style.sass';

const ShowAccount = ({ onClose, hidden }) => {
	const { Text } = Typography;
	/**Hooks for display or not modal login */
	const [ modalLogin, setModalLogin ] = useState(false);
	/**Hooks for display or not modal register */
	const [ modalRegister, setModalRegister ] = useState(false);
	/**Hooks welcome */
	const [ connectVisible, setConnectVisible ] = useState(false);
	//const connect = useSelector(state => state.connect);
	const dispatch = useDispatch();
	const history = useHistory();
	const sessionConnect = sessionStorage.getItem('Connect');
	//console.log("session header", sessionConnect);

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

	const deconnexion = () => {
		onClose();
		dispatch(deconnect());
		history.push('/');
		sessionStorage.clear();
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

	const klsHidden = classNames({
		[`hidden-show-account`]: hidden === true,
		[`manage-show-account`]: hidden === true
	});

	return (
		<div className={klsHidden}>
			<Row type="flex" justify="center" align="top">
				<Text>
					{sessionConnect === null && (
						<Link className="kls1" to="#" onClick={showModalLogin}>
							Connexion
						</Link>
					)}
					<FormLogin
						setModalLogin={setModalLogin}
						modalLogin={modalLogin}
						connectVisible={connectVisible}
						setConnectVisible={setConnectVisible}
					/>
					{sessionConnect && admin === -1 ? sessionConnect && artisanUser !== -1 ? (
						<Link className="kls1" to="/profil/artisan" onClick={handleClickProfileArtisan}>
							Profil
						</Link>
					) : (
						<Link className="kls1" to="/profil/particulier" onClick={handleClickProfileUser}>
							Profil
						</Link>
					) : (
						''
					)}
					{sessionConnect === 'connect' && admin !== -1 ? (
						<a className="kls1" href={`${NAME_SERVER}/admin`}>
							Admin{' '}
						</a>
					) : (
						''
					)}
				</Text>
			</Row>
			<Row type="flex" justify="center" align="top">
				{sessionConnect === null && (
					<Link className="kls2" to="#" onClick={showModalRegister}>
						Inscription
					</Link>
				)}
				{sessionConnect && (
					<Link className="kls2" to="#" onClick={deconnexion}>
						Deconnexion
					</Link>
				)}

				<ModalGoToFormUserOrArtisan modalRegister={modalRegister} setModalRegister={setModalRegister} />
			</Row>
		</div>
	);
};

export default ShowAccount;
