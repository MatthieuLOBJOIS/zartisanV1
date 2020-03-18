/**
 * Imports of dependencies
 */
import React from 'react';
import { useDispatch } from 'react-redux';
import { Button } from 'antd';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
/**
 * Local imports
 */
import './style.sass';
import { postHomeSearch } from 'src/store/search/actions';

const ButtonSearchArtisanList = withRouter(({ history, idJob, regionChange }) => {
	const dispatch = useDispatch();
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

ButtonSearchArtisanList.propTypes = {
	idJob: PropTypes.string.isRequired,
	regionChange: PropTypes.string.isRequired
};

export default ButtonSearchArtisanList;
