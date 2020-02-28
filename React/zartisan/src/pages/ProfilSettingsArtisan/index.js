/**
 * Imports of dependencies
 */
import React, { useState, useEffect } from 'react';
import { Row } from 'antd';
import { useSelector } from 'react-redux';
import 'antd/dist/antd.css';

import FormEditArtisan from 'src/components/FormEditArtisan';
import Loader from 'src/components/Loader';
import { useLoading } from 'src/hooks/loading';

const ProfilSettingsArtisan = () => {
	// Select artisan in the global state
	const artisanSelector = useSelector((state) => state.artisan);
	const data = JSON.parse(sessionStorage.getItem('ArtisanPage'));
	//console.log('1', artisanSelector, '2', data);

	let artisanObject = '';
	for (let artisan in data) {
		artisanObject = data[0];
	}

	//console.log(artisanObject);

	// Local state Artisan
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

	//console.log(profileArtisan);

	useEffect(
		() => {
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
		},
		[ artisanSelector ]
	);

	return (
		<div>
			<Row type="flex" justify="space-around" align="middle">
				{useLoading() == false && artisanObject != '' ? (
					<FormEditArtisan profileArtisan={profileArtisan} setProfileArtisan={setProfileArtisan} />
				) : (
					<Loader />
				)}
			</Row>
		</div>
	);
};

export default ProfilSettingsArtisan;
