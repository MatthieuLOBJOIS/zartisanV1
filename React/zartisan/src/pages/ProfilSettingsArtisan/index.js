/**
 * Imports of dependencies
 */
import React, { useState, useEffect } from 'react';
import { Row } from 'antd';
import { useSelector } from 'react-redux';
import 'antd/dist/antd.css';

import FormEditArtisan from 'src/components/FormEditArtisan';
import Loader from 'src/components/Loader';

const ProfilSettingsArtisan = () => {
	// Select artisan in the global state
	const artisanSelector = useSelector((state) => state.artisan);
	let artisanObject = '';
	for (let artisan in artisanSelector) {
		artisanObject = artisanSelector[0];
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
		[ artisanObject ]
	);

	return (
		<div>
			<Row type="flex" justify="space-around" align="middle">
				{artisanObject != '' ? (
					<FormEditArtisan profileArtisan={profileArtisan} setProfileArtisan={setProfileArtisan} />
				) : (
					<Loader />
				)}
			</Row>
		</div>
	);
};

export default ProfilSettingsArtisan;
