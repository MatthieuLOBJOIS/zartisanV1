//Imports of dependencies
import cookies from 'js-cookie';
import axios from 'axios';

//Local imports
import { NAME_SERVER } from 'src/store/register/actions';
import { USER_SINGLE } from 'src/store/user/actions';
import { EDIT_USER } from 'src/store/user/actions';
import { DELETE_USER } from 'src/store/user/actions';
import { responseUser } from 'src/store/user/actions';

export default (store) => (next) => (action) => {
	switch (action.type) {
		case USER_SINGLE: {
			let token = cookies.get('TOKEN');

			return axios({
				method: 'post',
				url: `${NAME_SERVER}/api/v1/user/single`, // first check with static home page
				data: {
					email: action.email
				},
				headers: { Authorization: `Bearer ${token}` }
			})
				.then((response) => {
					if (response.status === 200) {
						store.dispatch(responseUser(response.data));
					}
				})
				.catch(function(error) {
					// handle error
					//console.log(error);
				})
				.finally(function() {
					// always executed
				});
		}
		case EDIT_USER: {
			let token = cookies.get('TOKEN');
			return axios({
				method: 'post',
				url: `${NAME_SERVER}/api/v1/user/edit`,
				data: {
					email: action.data.mail,
					picture: action.data.pictureAvatar,
					nickname: action.data.nickname,
					lastname: action.data.lastname,
					firstname: action.data.firstname,
					phone: action.data.phone
				},
				headers: { Authorization: `Bearer ${token}` }
			})
				.then((response) => {})
				.catch(function(error) {
					// handle error
					//console.log(error);
				})
				.finally(function() {
					// always executed
				});
		}

		case DELETE_USER: {
			let token = cookies.get('TOKEN');
			return axios({
				method: 'post',
				url: `${NAME_SERVER}/api/v1/user/delete`,
				data: {
					email: action.data
				},
				headers: { Authorization: `Bearer ${token}` }
			})
				.then((response) => {
					if (response.status === 200) {
						console.log('valide delete');
					}
				})
				.catch(function(error) {
					// handle error
					//console.log(error);
				})
				.finally(function() {
					// always executed
				});
		}
	}

	next(action);
};
