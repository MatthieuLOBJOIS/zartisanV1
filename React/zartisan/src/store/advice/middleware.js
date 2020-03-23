//Imports of dependencies
import cookies from 'js-cookie';
import axios from 'axios';

//Local imports
import { ALERT_ADVICE } from 'src/store/advice/actions';
import { alertSuccess } from 'src/store/advice/actions';
import { SEND_ADVICE } from 'src/store/advice/actions';
import { advice } from 'src/store/advice/actions';
import { NAME_SERVER } from 'src/store/register/actions';

export default (store) => (next) => (action) => {
	switch (action.type) {
		case ALERT_ADVICE: {
			let token = cookies.get('TOKEN');
			return axios({
				method: 'post',
				url: `${NAME_SERVER}/api/v1/advice/report`,
				data: {
					id: action.id
				},
				headers: { Authorization: `Bearer ${token}` }
			})
				.then((response) => {
					if (response.status === 200) {
						store.dispatch(alertSuccess(response.data));
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
		case SEND_ADVICE: {
			let token = cookies.get('TOKEN');
			return axios({
				method: 'post',
				url: `${NAME_SERVER}/api/v1/advice/add`,
				data: {
					email: action.mail,
					body: action.body,
					artisanId: action.idArtisan
				},
				headers: { Authorization: `Bearer ${token}` }
			})
				.then((response) => {
					if (response.status === 200) {
						store.dispatch(advice(response.data));
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
