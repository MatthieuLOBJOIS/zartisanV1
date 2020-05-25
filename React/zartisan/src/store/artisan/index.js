//Local imports
import { ARTISAN_INFO, ARTISAN_SAVE_SUCCESS } from 'src/store/artisan/actions';

const initialState = {
	artisan: '',
	saveArtisan: null
};

export default (state = initialState, action) => {
	switch (action.type) {
		case ARTISAN_INFO: {
			//state = action.data;
			return { ...state, artisan: action.data };
		}
		case ARTISAN_SAVE_SUCCESS: {
			return { ...state, saveArtisan: action.success };
		}
		default: {
			return state;
		}
	}
};
