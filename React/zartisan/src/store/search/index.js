import { HOME_SEARCH } from 'src/store/search/actions';

const initialState = [];

export default (state = initialState, action) => {
	switch (action.type) {
		case HOME_SEARCH: {
			return (state = action.dataArtisan);
		}
		default: {
			return state;
		}
	}
};
