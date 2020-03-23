//Imports of dependencies
import { createStore, compose, applyMiddleware } from 'redux';

//Local imports
import reducer from './reducer';
import middlewareRegister from 'src/store/register/middleware';
import middlewareRegions from 'src/store/regions/middleware';
import middlewareJobs from 'src/store/jobs/middleware';
import middlewareSearch from 'src/store/search/middleware';
import middlewareArtisan from 'src/store/artisan/middleware';
import middlewareRate from 'src/store/rate/middleware';
import middlewareAdvice from 'src/store/advice/middleware';
import middlewareUser from 'src/store/user/middleware';

const withReduxDevTools = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const middlewares = applyMiddleware(
	middlewareRegister,
	middlewareRegions,
	middlewareJobs,
	middlewareSearch,
	middlewareArtisan,
	middlewareRate,
	middlewareAdvice,
	middlewareUser
);

//Creation of the store of the application, with its private state
const reactModelStore = createStore(reducer, withReduxDevTools(middlewares));

//Just for debugging, don't let it go into production.
window.store = reactModelStore;

export default reactModelStore;
