//Imports of dependencies

import axios from 'axios';
import cookies from 'js-cookie';

//Local imports
import { SEND_PASSWORD_FORGET } from 'src/store/register/actions';
import { SEND_REGISTER_USER } from 'src/store/register/actions';
import { SEND_REGISTER_ARTISAN } from 'src/store/register/actions';
import { SEND_LOGIN } from 'src/store/register/actions';
import { CONNECT } from 'src/store/register/actions';
import { CONNECT_FAIL } from 'src/store/register/actions';
import { validRegister } from 'src/store/register/actions';
import { NAME_SERVER } from 'src/store/register/actions';

export default (store) => (next) => (action) => {
	const loginCheck = () => {
		axios({
			method: 'post',
			url: `${NAME_SERVER}/api/login_check`, // first check with static home page
			data: {
				username: action.username,
				password: action.password
			}
		})
			.then((response) => {
				if (response.status === 200) {
					cookies.set('TOKEN', response.data.token);

					store.dispatch({ type: CONNECT });
				}
			})
			.catch(function(error) {
				// handle error

				store.dispatch({ type: CONNECT_FAIL });
			})
			.finally(function() {
				// always executed
			});
	};

	switch (action.type) {
		case SEND_LOGIN: {
			return loginCheck();
		}
		case SEND_REGISTER_USER: {
			const data = {
				email: action.email,
				password: action.password
			};
			return axios({
				method: 'post',
				url: `${NAME_SERVER}/register/user`, // first check with static home page
				data
			})
				.then((response) => {
					if (response.status === 200) {
						console.log('inscription');
						store.dispatch(validRegister());
					}
				})
				.catch(function(error) {
					// handle error
					console.log(error);
				})
				.finally(function() {
					// always executed
				});
		}
		case SEND_REGISTER_ARTISAN: {
			const data = {
				email: action.email,
				password: action.password,
				siret: action.siret
			};
			return axios({
				method: 'post',
				url: `${NAME_SERVER}/register/artisan`, // first check with static home page
				data
			})
				.then((response) => {
					if (response.status === 200) {
						store.dispatch(validRegister());
					}
				})
				.catch(function(error) {
					// handle error
					console.log(error);
				})
				.finally(function() {
					// always executed
				});
		}

		/**
     * FORGETTEN PASSWORD
     */

		case SEND_PASSWORD_FORGET: {
			const data = {
				email: action.email,
				password: action.password
			};
			return axios({
				method: 'post',
				url: `${NAME_SERVER}/resetPassMail`,
				data
			})
				.then((response) => {})
				.catch(function(error) {
					//console.log(error);
				})
				.finally(function() {});
		}
	}
	next(action);
};
