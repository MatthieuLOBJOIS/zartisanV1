//Imports of dependencies
import axios from 'axios';

//Local imports
import { NAME_SERVER } from 'src/store/register/actions';
import { GET_REGIONS } from 'src/store/regions/actions';
import { regions } from 'src/store/regions/actions';

export default (store) => (next) => (action) => {
	switch (action.type) {
		case GET_REGIONS: {
			return axios({
				method: 'get',
				url: `${NAME_SERVER}/v1/region/list`
			})
				.then((response) => {
					if (response.status === 200) {
						store.dispatch(regions(response.data));
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
