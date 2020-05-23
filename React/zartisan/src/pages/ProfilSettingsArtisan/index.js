//Imports of dependencies
import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Row } from 'antd';
import 'antd/dist/antd.css';

//Local imports
import { useLoading } from 'src/hooks/useLoading';
import './style.sass';

//Components
import FormEditArtisan from 'src/components/FormEditArtisan';
import Loader from 'src/components/Loader';

//Components content of page profile artisan
const ProfilSettingsArtisan = () => {
	//Hooks
	let toLoading = useLoading();
	const artisanSelector = useSelector((state) => state.artisan);

	const [ sessionArtisan, setSessionArtisan ] = useState(null);
	const [ profileArtisan, setProfileArtisan ] = useState({
		firstname: '',
		lastname: '',
		siret: '',
		company: '',
		numberWay: '',
		way: '',
		postalCode: '',
		city: '',
		description: '',
		pictureAvatar: '',
		pictureGalery: '',
		phone: '',
		email: ''
	});

	//Creat session for account artisan

	//const sessionArtisan = JSON.parse(localStorage.getItem("ProfileArtisan"));

	useEffect(
		() => {
			setSessionArtisan(JSON.parse(localStorage.getItem('ProfileArtisan')));
		},
		[ artisanSelector ]
	);

	useEffect(
		() => {
			//console.log(sessionArtisan);
			if (sessionArtisan !== null) {
				setProfileArtisan({
					firstname: sessionArtisan.firstname,
					lastname: sessionArtisan.lastname,
					siret: sessionArtisan.siret,
					company: sessionArtisan.company,
					numberWay: sessionArtisan.numberWay,
					way: sessionArtisan.way,
					postalCode: sessionArtisan.postalCode,
					city: sessionArtisan.city,
					description: sessionArtisan.companyDescription,
					pictureAvatar: sessionArtisan.picture,
					pictureGalery: sessionArtisan.pictureFolder,
					phone: sessionArtisan.phone,
					email: sessionArtisan.email
				});
			}
		},
		[ sessionArtisan ]
	);

	return (
		<div>
			<Row type="flex" justify="space-around" align="middle">
				{sessionArtisan !== null && toLoading === false ? (
					<FormEditArtisan
						artisanObject={sessionArtisan}
						profileArtisan={profileArtisan}
						setProfileArtisan={setProfileArtisan}
					/>
				) : (
					<Loader />
				)}
			</Row>
		</div>
	);
};

export default ProfilSettingsArtisan;
