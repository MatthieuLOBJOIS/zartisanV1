//Imports of dependencies
import React, { useState, useEffect } from 'react';
import { Row } from 'antd';
import { Helmet } from 'react-helmet';

//Local imports
import './style.sass';
import { useRegion } from 'src/hooks/useRegion';

//Components
import FranceMap from 'src/components/FranceMap';
import ButtonSearchArtisanList from 'src/components/ButtonSearchArtisanList';
import ButtonJob from 'src/components/ButtonJob';
import ButtonRegion from 'src/components/ButtonRegion';
import Loader from 'src/components/Loader';

//Components content of page home
const Home = () => {
	//Hooks
	const [ visibleButtonJobs, setvisibleButtonJobs ] = useState(false);
	const [ regionChange, setRegion ] = useState('Choisissez une Région');
	const [ jobChange, setJobChange ] = useState('Choisissez votre métier');
	const [ idJob, setIdJob ] = useState('');
	const [ regionArray, setRegionArray ] = useState([]);
	const regions = useRegion();

	useEffect(
		() => {
			setRegionArray(regions);
		},
		[ regions ]
	);

	return (
		<div style={{ width: '100vw', textAlign: 'center' }}>
			{regionArray.length !== 0 ? (
				<div className="home">
					<Helmet>
						<title>Z'Artisan - Accueil</title>
					</Helmet>
					<Row className="home-content-button" type="flex" justify="space-around" align="middle">
						<Row type="flex" className="home-button-dropdown" justify="space-around" align="middle">
							<ButtonRegion
								regionChange={regionChange}
								setRegion={setRegion}
								visibleButtonJobs={visibleButtonJobs}
								setvisibleButtonJobs={setvisibleButtonJobs}
							/>
						</Row>

						<Row type="flex" justify="space-around" align="middle" className="home-button-dropdown">
							<ButtonJob
								jobChange={jobChange}
								setJobChange={setJobChange}
								setIdJob={setIdJob}
								visibleButtonJobs={visibleButtonJobs}
								setvisibleButtonJobs={setvisibleButtonJobs}
							/>
						</Row>
					</Row>

					<Row type="flex" justify="space-around" align="middle" className="home-france">
						<FranceMap
							setvisibleButtonJobs={setvisibleButtonJobs}
							setRegion={setRegion}
							regionChange={regionChange}
						/>
					</Row>

					<Row type="flex" justify="space-around" align="middle">
						<ButtonSearchArtisanList regionChange={regionChange} idJob={idJob} />
					</Row>
				</div>
			) : (
				<Loader />
			)}
		</div>
	);
};

export default Home;
