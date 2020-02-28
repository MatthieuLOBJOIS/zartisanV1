import { HOME_SEARCH } from 'src/store/search/actions';

const initialState = [];

export default (state = initialState, action) => {
	//console.log('reducer >>', action);

	switch (action.type) {
		case HOME_SEARCH: {
			//console.log('action reducer search', action.dataArtisan);
			sessionStorage.setItem('ArtisanList', JSON.stringify(action.dataArtisan));
			return (state = [ action.dataArtisan ]);
		}
		default: {
			return state;
		}
	}
};
