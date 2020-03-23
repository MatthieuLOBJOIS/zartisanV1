//Imports of dependencies
import React from 'react';
import { Link } from 'react-router-dom';

//Local imports
import './style.sass';

//Components: if error "not found"
const PageError = () => {
	return (
		<div className="error-404">
			<Link className="link-404" to="/">
				Retour à l'accueil
			</Link>
		</div>
	);
};

export default PageError;
