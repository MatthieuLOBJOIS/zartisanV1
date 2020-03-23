//Local imports
import { RESPONSE_USER } from 'src/store/user/actions';

const initialState = '';

export default (state = initialState, action) => {
	switch (action.type) {
		case RESPONSE_USER: {
			return (state = action.data);
		}
		default: {
			return state;
		}
	}
};
