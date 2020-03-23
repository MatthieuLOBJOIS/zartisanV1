//Imports of dependencies
import React from 'react';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { Button } from 'antd';

//Local imports
import { postHomeSearch } from 'src/store/search/actions';
import './style.sass';

//Components for page "Home and ListArtisan" : button that sends the different results of artisans.
const ButtonSearchArtisanList = withRouter(({ history, idJob, regionChange }) => {
	//Hooks
	const dispatch = useDispatch();

	//Event handle onClick that trigger a action for search the different results artisan by region
	//The action need region name and idJob in arguments
	const handleSearch = () => {
		dispatch(postHomeSearch(regionChange, idJob));

		history.push('/liste-artisan');
	};

	return (
		<Button className="home-button-search" className="buttons" onClick={handleSearch}>
			Recherche
		</Button>
	);
});

//PropTypes
ButtonSearchArtisanList.propTypes = {
	idJob: PropTypes.string.isRequired,
	regionChange: PropTypes.string.isRequired
};

export default ButtonSearchArtisanList;
