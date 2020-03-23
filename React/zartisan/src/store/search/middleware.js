import cookies from 'js-cookie';
import { POST_HOME_SEARCH } from 'src/store/search/actions';
import { homeSearch } from 'src/store/search/actions';
import axios from 'axios';

import { NAME_SERVER } from 'src/store/register/actions';

export default (store) => (next) => (action) => {
	switch (action.type) {
		// Search artisan list by region and job from home

		case POST_HOME_SEARCH: {
			let token = cookies.get('TOKEN');
			return axios({
				method: 'post',
				url: `${NAME_SERVER}/v1/artisan/recherche`,
				data: {
					idJob: action.job,
					nameRegion: action.region
				},
				headers: { Authorization: `Bearer ${token}` }
			})
				.then((response) => {
					if (response.status === 200) {
						store.dispatch(homeSearch(response.data));
					}
				})
				.catch(function(error) {
					// handle error
				})
				.finally(function() {
					// always executed
				});
		}
	}
	next(action);
};
