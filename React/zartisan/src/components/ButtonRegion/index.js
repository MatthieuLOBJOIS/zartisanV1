//Imports of dependencies
import React from 'react';
import PropTypes from 'prop-types';
import { useSelector, useDispatch } from 'react-redux';
import { Button, Icon, Menu, Dropdown } from 'antd';

//Local imports

import { getJobs } from 'src/store/jobs/actions';
import { visibleJobDropdown } from 'src/services/local-state-service';

import './style.sass';

//Components for page "Home and ListArtisan" : Implements a button for select a region
const ButtonRegion = ({ setvisibleButtonJobs, regionChange, setRegion }) => {
	//Hooks

	const dispatch = useDispatch();
	const regions = useSelector((state) => state.regions);

	//Choose a region for display button job and send request list jobs
	const changeRegion = (event) => {
		setRegion(event.item.props.value);
		dispatch(getJobs(event.item.props.value));
		visibleJobDropdown(setvisibleButtonJobs);
	};

	//List of region
	//Select region on the map France
	const itemRegions = regions.map((regionObject) => {
		const array = [];
		for (let regionCode in regionObject) {
			const region = { id: regionCode, name: regionObject[regionCode] };
			array.push(region);
		}
		const item = array.map((region) => {
			return (
				<Menu.Item onClick={changeRegion} key={region.id} value={region.name}>
					{region.name}
				</Menu.Item>
			);
		});
		return item;
	});

	const menuRegion = <Menu className="menu-region">{itemRegions}</Menu>;

	return (
		<Dropdown overlay={menuRegion} trigger={[ 'click' ]} placement="bottomLeft">
			<Button className="home-button-region" style={{ backgroundColor: '#bb9574', color: 'white' }}>
				{regionChange} <Icon type="down" />
			</Button>
		</Dropdown>
	);
};

//PropTypes
ButtonRegion.propTypes = {
	setvisibleButtonJobs: PropTypes.func.isRequired,
	regionChange: PropTypes.string.isRequired,
	setRegion: PropTypes.func.isRequired
};

export default ButtonRegion;
