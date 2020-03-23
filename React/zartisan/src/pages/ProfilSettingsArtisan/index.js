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

	const [ profileArtisan, setProfileArtisan ] = useState({
		firstname: artisanObject.firstname,
		lastname: artisanObject.lastname,
		siret: artisanObject.siret,
		company: artisanObject.company,
		numberWay: artisanObject.numberWay,
		way: artisanObject.way,
		postalCode: artisanObject.postalCode,
		city: artisanObject.city,
		description: artisanObject.companyDescription,
		pictureAvatar: artisanObject.picture,
		pictureGalery: artisanObject.pictureFolder,
		phone: artisanObject.phone,
		email: artisanObject.email
	});

	//Creat session for account artisan
	if (artisanSelector != '') {
		sessionStorage.setItem('ProfileArtisan', JSON.stringify(artisanSelector));
	}
	const sessionArtisan = JSON.parse(sessionStorage.getItem('ProfileArtisan'));
	let artisanObject = '';

	for (let artisan in sessionArtisan) {
		artisanObject = sessionArtisan[0];
	}

	useEffect(
		() => {
			if (sessionArtisan !== null) {
				setProfileArtisan({
					firstname: artisanObject.firstname,
					lastname: artisanObject.lastname,
					siret: artisanObject.siret,
					company: artisanObject.company,
					numberWay: artisanObject.numberWay,
					way: artisanObject.way,
					postalCode: artisanObject.postalCode,
					city: artisanObject.city,
					description: artisanObject.companyDescription,
					pictureAvatar: artisanObject.picture,
					pictureGalery: artisanObject.pictureFolder,
					phone: artisanObject.phone,
					email: artisanObject.email
				});
			}
		},
		[ artisanSelector ]
	);

	return (
		<div>
			<Row type="flex" justify="space-around" align="middle">
				{profileArtisan.siret !== undefined && toLoading === false ? (
					<FormEditArtisan
						artisanObject={artisanObject}
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
