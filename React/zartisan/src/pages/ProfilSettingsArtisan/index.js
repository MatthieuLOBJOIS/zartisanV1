/**
 * Imports of dependencies
 */
import React, { useState, useEffect } from 'react';
import { Row } from 'antd';
import { useSelector } from 'react-redux';
import './style.sass';
import 'antd/dist/antd.css';

import FormEditArtisan from 'src/components/FormEditArtisan';
import Loader from 'src/components/Loader';

const ProfilSettingsArtisan = () => {
	// Select artisan in the global state
	const artisanSelector = useSelector((state) => state.artisan);

	if (artisanSelector != '') {
		sessionStorage.setItem('ProfileArtisan', JSON.stringify(artisanSelector));
	}

	const sessionArtisan = JSON.parse(sessionStorage.getItem('ProfileArtisan'));
	console.log(artisanSelector, 'select obj');
	let artisanObject = '';

	for (let artisan in sessionArtisan) {
		artisanObject = sessionArtisan[0];
	}

	console.log('oject', artisanObject);

	// Local state Artisan
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

	//console.log('profilearti', profileArtisan);

	return (
		<div>
			<Row type="flex" justify="space-around" align="middle">
				{profileArtisan.siret !== undefined ? (
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
