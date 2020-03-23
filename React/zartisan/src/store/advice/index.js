//Local imports
import { ALERT_SUCCESS } from 'src/store/advice/actions';

const initialState = null;

export default (state = initialState, action) => {
	switch (action.type) {
		case ALERT_SUCCESS: {
			return (state = action.response);
		}
		default: {
			return state;
		}
	}
};
