/**
 * Imports of dependencies
 */
import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Button, Icon, Menu, Dropdown } from 'antd';

import classNames from 'classnames';
/**
 * Local imports
 */
import './style.sass';

const ButtonJob = ({ visibleButtonJobs, jobChange, setJobChange, setIdJob }) => {
	let jobs = useSelector((state) => state.jobs);

	/**
	 * menu jobs
	 */

	let arrayJobs = jobs[0];
	//console.log('array', arrayJobs);
	let jobartisan = '';

	useEffect(
		() => {
			//console.log('new ', jobs);
			if (jobs != null) {
				//setJobChange('Choisissez votre métier');
			} else {
				setJobChange('Aucun métier');
			}
		},
		[ jobs ]
	);

	const klsDisplayButton = classNames('home-button-region -cascader-jobs button-job', {
		'button-job--display': visibleButtonJobs == true
	});

	if (arrayJobs != undefined) {
		jobartisan = arrayJobs.map((job) => {
			const handleJobChange = (event) => {
				//console.log('id job', event.item.props.eventKey);
				chooseJob(event.item.props.value);
				setIdJob(event.item.props.eventKey);
			};

			const chooseJob = (job) => {
				setJobChange(job);
			};

			return (
				<Menu.Item onClick={handleJobChange} key={job.id} value={job.name}>
					{job.name}
				</Menu.Item>
			);
		});
		//console.log('final ', jobartisan);
	}

	const menuJobs = <Menu>{jobartisan}</Menu>;

	return (
		<Dropdown overlay={menuJobs} trigger={[ 'click' ]} placement="bottomLeft">
			<Button
				className={klsDisplayButton}
				style={{ backgroundColor: 'white', color: '#bb9574', border: '1px solid #bb9574' }}
			>
				{jobChange} <Icon type="down" />
			</Button>
		</Dropdown>
	);
};

export default ButtonJob;
