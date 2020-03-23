//Local imports
import { REGIONS } from 'src/store/regions/actions';

const initialState = [];

export default (state = initialState, action) => {
	switch (action.type) {
		case REGIONS: {
			return (state = [ action.regions ]);
		}
		default: {
			return state;
		}
	}
};
