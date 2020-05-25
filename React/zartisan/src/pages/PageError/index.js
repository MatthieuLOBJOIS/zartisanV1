//Imports of dependencies
import React from "react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet";

//Local imports
import "./style.sass";

//Components: if error "not found"
const PageError = () => {
  return (
    <div className="error-404">
      <Helmet>
        <title>Z'Artisan - Erreur 404</title>
      </Helmet>
      <Link className="link-404" to="/">
        Retour à l'accueil
      </Link>
    </div>
  );
};

export default PageError;
