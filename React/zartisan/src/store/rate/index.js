//Local imports
import { RATE } from 'src/store/rate/actions';

const initialState = null;

export default (state = initialState, action) => {
	switch (action.type) {
		case RATE: {
			state = action.averageRate;
		}
		default: {
			return state;
		}
	}
};
