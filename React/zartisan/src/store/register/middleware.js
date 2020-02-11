/**
 * Imports of dependencies
 */
import axios from 'axios';
import cookies from 'js-cookie';
/**
 * Local imports
 */
import { SEND_PASSWORD_FORGET } from 'src/store/register/actions';
import { SEND_REGISTER_USER } from 'src/store/register/actions';
import { SEND_REGISTER_ARTISAN } from 'src/store/register/actions';
import { SEND_LOGIN } from 'src/store/register/actions';
import { CONNECT } from 'src/store/register/actions';
/**
 * NAME SERVER
 */
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
				// console.log(response);
				if (response.status === 200) {
					// console.log('connexion-login');
					cookies.set('TOKEN', response.data.token);
					// console.log(cookies.set('TOKEN', response.data.token));
					store.dispatch({ type: CONNECT });
				}
			})
			.catch(function(error) {
				// handle error
				//console.log(error);
			})
			.finally(function() {
				// always executed
			});
	};

	switch (action.type) {
		/**
     * Connexion
     */
		case SEND_LOGIN: {
			return loginCheck();
		}

		/**
     * User register
     */
		case SEND_REGISTER_USER: {
			const data = {
				email: action.email,
				password: action.password
			};
			// console.log(data);

			return axios({
				method: 'post',
				url: `${NAME_SERVER}/register/user`, // first check with static home page
				data
			})
				.then((response) => {
					// console.log(response);
					if (response.status === 200) {
						//console.log('inscription')
					}
				})
				.catch(function(error) {
					// handle error
					// console.log(error);
				})
				.finally(function() {
					// always executed
				});
		}

		/**
     * Artisan register
     */
		case SEND_REGISTER_ARTISAN: {
			const data = {
				email: action.email,
				password: action.password,
				siret: action.siret
			};
			console.log(data);

			return axios({
				method: 'post',
				url: `${NAME_SERVER}/register/artisan`, // first check with static home page
				data
			})
				.then((response) => {
					// console.log(response);
					if (response.status === 200) {
						console.log('inscription');
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
			//console.log(data);

			return axios({
				method: 'post',
				url: `${NAME_SERVER}/resetPassMail`,
				data
			})
				.then((response) => {
					//console.log(response);
					if (response.status === 200) {
						//console.log('test reussi');
					}
				})
				.catch(function(error) {
					//console.log(error);
				})
				.finally(function() {});
		}
	}
	next(action);
};
