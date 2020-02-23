import { CONNECT } from 'src/store/register/actions';
import { DECONNEXION } from 'src/store/register/actions';
import { VALID_REGISTER } from 'src/store/register/actions';

const initialState = false;

export default (state = initialState, action) => {
	//console.log('reducer - connexion >>', action);

	switch (action.type) {
		case CONNECT: {
			return (state = true);
		}
		case DECONNEXION: {
			return (state = false);
		}
		case VALID_REGISTER: {
			return (state = 'register');
		}

		default: {
			return state;
		}
	}
};
