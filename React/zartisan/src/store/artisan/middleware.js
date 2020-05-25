//Imports of dependencies
import cookies from 'js-cookie';
import axios from 'axios';

//Local imports
import { ARTISAN_DATA, ARTISAN_EDIT, artisanInfo, artisanSaveSuccess } from 'src/store/artisan/actions';
import { NAME_SERVER } from 'src/store/register/actions';

export default (store) => (next) => (action) => {
	switch (action.type) {
		case ARTISAN_DATA: {
			let token = cookies.get('TOKEN');
			return axios({
				method: 'post',
				url: `${NAME_SERVER}/v1/artisan/single`,
				data: {
					email: action.email
				},
				headers: { Authorization: `Bearer ${token}` }
			})
				.then((response) => {
					if (response.status === 200) {
						//Creat session for page-artisan
						localStorage.setItem('PageArtisan', JSON.stringify(response.data));

						localStorage.setItem('ProfileArtisan', JSON.stringify(response.data[0]));
						store.dispatch(artisanInfo(response.data));
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

		case ARTISAN_EDIT: {
			let token = cookies.get('TOKEN');
			return axios({
				method: 'post',
				url: `${NAME_SERVER}/api/v1/artisan/edit`,
				data: {
					email: action.email,
					companyDescription: action.description,
					picture: action.pictureAvatar,
					phone: action.phone,
					pictureFolder: action.pictureGalery
				},
				headers: { Authorization: `Bearer ${token}` }
			})
				.then((response) => {
					localStorage.setItem('ProfileArtisan', JSON.stringify(response.data));
					store.dispatch(artisanInfo(response.data));
					store.dispatch(artisanSaveSuccess(true));
				})
				.catch(function(error) {
					// handle error
					//console.log(error);
					store.dispatch(artisanSaveSuccess(false));
				})
				.finally(function() {
					// always executed
				});
		}
	}

	next(action);
};
