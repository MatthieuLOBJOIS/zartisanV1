/**
 * Imports of dependencies
 */
import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Button, Icon, Menu, Dropdown } from 'antd';

/**
 * Local imports
 */
import './style.sass';
import { getRegions } from 'src/store/regions/actions';
import { getJobs } from 'src/store/jobs/actions';

const ButtonRegion = ({ visibleButtonJobs, setvisibleButtonJobs, regionChange, setRegion }) => {
	const regions = useSelector((state) => state.regions);
	const dispatch = useDispatch();

	const visibleJobDropdown = () => {
		setvisibleButtonJobs(true);
	};

	const changeRegion = (event) => {
		setRegion(event.item.props.value);
		dispatch(getJobs(event.item.props.value));
		visibleJobDropdown();
	};

	useEffect(() => {
		dispatch(getRegions());
	}, []);

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

	const menuRegion = <Menu>{itemRegions}</Menu>;

	return (
		<Dropdown overlay={menuRegion} trigger={[ 'click' ]} placement="bottomLeft">
			<Button className="home-button-region" style={{ backgroundColor: '#bb9574', color: 'white' }}>
				{regionChange} <Icon type="down" />
			</Button>
		</Dropdown>
	);
};

export default ButtonRegion;
