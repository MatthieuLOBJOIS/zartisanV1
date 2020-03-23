//Imports of dependencies
import axios from 'axios';
import cookies from 'js-cookie';

//Local imports
import { NAME_SERVER } from 'src/store/register/actions';
import { SEND_RATE } from 'src/store/rate/actions';
import { rate } from 'src/store/rate/actions';

export default (store) => (next) => (action) => {
	switch (action.type) {
		case SEND_RATE: {
			const token = cookies.get('TOKEN');
			return axios({
				method: 'post',
				url: `${NAME_SERVER}/api/v1/rate/add`,
				data: {
					id: action.id,
					email: action.mail,
					value: action.value
				},
				headers: { Authorization: `Bearer ${token}` }
			})
				.then((response) => {
					if (response.status === 200) {
						store.dispatch(rate(response.data));
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
