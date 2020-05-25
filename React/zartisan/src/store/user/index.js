//Local imports
import { RESPONSE_USER, USER_SAVE_SUCCESS } from 'src/store/user/actions';

const initialState = {
	user: '',
	saveUser: null
};

export default (state = initialState, action) => {
	switch (action.type) {
		case RESPONSE_USER: {
			return { ...state, user: action.data };
		}
		case USER_SAVE_SUCCESS: {
			return { ...state, saveUser: action.success };
		}
		default: {
			return state;
		}
	}
};
