/**
 * NAME SERVER
 */
import { NAME_SERVER } from 'src/store/register/actions';
import { USER_SINGLE } from 'src/store/user/actions';
import { EDIT_USER } from 'src/store/user/actions';
import { responseUser } from 'src/store/user/actions';
import axios from 'axios';

export default (store) => (next) => (action) => {
	switch (action.type) {
		case USER_SINGLE: {
			//console.log('middleware user', action.email);

			return axios({
				method: 'post',
				url: `${NAME_SERVER}/v1/user/single`, // first check with static home page
				data: {
					email: action.email
				}
			})
				.then((response) => {
					// console.log(response);
					if (response.status === 200) {
						//console.log('valide user', response.data);
						store.dispatch(responseUser(response.data));
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
		case EDIT_USER: {
			console.log('middleware edit', action.data.mail);

			return axios({
				method: 'post',
				url: `${NAME_SERVER}/v1/user/edit`,
				data: {
					email: action.data.mail,
					picture: action.data.pictureAvatar,
					nickname: action.data.nickname,
					lastname: action.data.lastname,
					firstname: action.data.firstname,
					phone: action.data.phone
				}
			})
				.then((response) => {
					// console.log(response);
					if (response.status === 200) {
						console.log('valide edit');
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
	}

	next(action);
};
