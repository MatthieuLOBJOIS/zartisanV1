//Imports of dependencies
import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import classNames from 'classnames';
import { Button, Icon, Menu, Dropdown } from 'antd';

//Local imports
import Loader from 'src/components/Loader';
import './style.sass';

//Components for page "Home and ListArtisan" : Implements a button for select a job
//Need select a region for display button job
const ButtonJob = ({ visibleButtonJobs, jobChange, setJobChange, setIdJob }) => {
	//Hooks
	let jobs = useSelector((state) => state.jobs);

	let arrayJobs = jobs[0];
	let jobartisan = '';

	useEffect(
		() => {
			if (jobs != null) {
			} else {
				setJobChange('Aucun métier');
			}
		},
		[ jobs ]
	);

	//Class for manage the display of button job
	const klsDisplayButton = classNames('home-button-region -cascader-jobs button-job', {
		'button-job--display': visibleButtonJobs == true
	});

	//List of job by region
	if (arrayJobs != undefined) {
		jobartisan = arrayJobs.map((job) => {
			const handleJobChange = (event) => {
				chooseJob(event.item.props.value);
				setIdJob(event.item.props.eventKey);
			};

			const chooseJob = (job) => {
				setJobChange(job);
			};
			//Reduce the length of strings that are too long
			let jobName = job.name.slice(0, 40);
			if (jobName.length === 40) {
				jobName = `${jobName}...`;
			}

			return (
				<Menu.Item onClick={handleJobChange} key={job.id} value={job.name}>
					{jobName}
				</Menu.Item>
			);
		});
	}

	const menuJobs =
		arrayJobs === null ? (
			<Menu style={{ textAlign: 'center' }} className="menu-job">
				Aucun métier trouvé
			</Menu>
		) : (
			<Menu className="menu-job">{jobartisan}</Menu>
		);

	return (
		<Dropdown overlay={arrayJobs !== undefined ? menuJobs : Loader} trigger={[ 'click' ]} placement="bottomLeft">
			<Button
				className={klsDisplayButton}
				style={{
					backgroundColor: 'white',
					color: '#bb9574',
					border: '1px solid #bb9574'
				}}
			>
				{jobChange} <Icon type="down" />
			</Button>
		</Dropdown>
	);
};

//PropTypes
ButtonJob.propTypes = {
	visibleButtonJobs: PropTypes.bool.isRequired,
	jobChange: PropTypes.string.isRequired,
	setJobChange: PropTypes.func.isRequired,
	setIdJob: PropTypes.func.isRequired
};

export default ButtonJob;
