//Local imports
import { JOBS } from 'src/store/jobs/actions';

const initialState = [];

export default (state = initialState, action) => {
	switch (action.type) {
		case JOBS: {
			return (state = [ action.jobs ]);
		}
		default: {
			return state;
		}
	}
};
