/**
 * Imports of dependencies
 */
import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

/**
 * Local imports
 */
// React Components
import Header from 'src/components/Header';
import Home from 'src/pages/Home';
import Footer from 'src/components/Footer';
import ListArtisan from 'src/pages/ListArtisan';
import PageArtisan from 'src/pages/PageArtisan';
import LegalNotices from 'src/pages/LegalNotices';
import PageError from 'src/pages/PageError';
import ForgottenPassword from 'src/pages/ForgottenPassword';
import ProfilSettingsArtisan from 'src/pages/ProfilSettingsArtisan';
import ProfileSettingsUser from 'src/pages/ProfileSettingsUser';

/**
 * Code
 */
const App = () => {
	return (
		<div id="app">
			<Router>
				<Header />
				<Switch>
					<Route exact path="/">
						<Home />
					</Route>
					<Route exact path="/liste-artisan">
						<ListArtisan />
					</Route>
					<Route exact path="/page-artisan/:id">
						<PageArtisan />
					</Route>
					<Route exact path="/profil/particulier">
						<ProfileSettingsUser />
					</Route>
					<Route exact path="/profil/artisan">
						<ProfilSettingsArtisan />
					</Route>
					<Route exact path="/mentions-legal">
						<LegalNotices />
					</Route>
					<Route exact path="/mot-de-passe-oublié">
						<ForgottenPassword />
					</Route>
					<Route>
						<PageError />
					</Route>
				</Switch>
				<Footer />
			</Router>
		</div>
	);
};

/**
 * Export
 */
export default App;
