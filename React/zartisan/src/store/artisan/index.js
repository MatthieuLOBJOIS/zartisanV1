//Local imports
import { ARTISAN_INFO } from 'src/store/artisan/actions';

const initialState = '';

export default (state = initialState, action) => {
	switch (action.type) {
		case ARTISAN_INFO: {
			state = action.data;
			return state;
		}
		default: {
			return state;
		}
	}
};
