//Imports of dependencies
import React from 'react';
import PropTypes from 'prop-types';
import { Form, Input } from 'antd';
import 'antd/dist/antd.css';

//Local imports
import { artisanEdit } from 'src/store/artisan/actions';
import { artisanData } from 'src/store/artisan/actions';
//Components
import UploadAvatar from 'src/components/UploadAvatar';
import UploadPictureGalery from 'src/components/UploadPictureGalery';
import ButtonDeleteAccount from 'src/components/ButtonDeleteAccount';
import ButtonSaveAccount from 'src/components/ButtonSaveAccount';

//Components for page "ProfileSettingsArtisan" : Implements the form for edit artisan account
const FormEditArtisan = ({ artisanObject, profileArtisan, setProfileArtisan }) => {
	const { TextArea } = Input;

	//Event handle onChange that detect every value change on the input and update local state
	const handleChangeValue = (keys) => {
		return (event) => {
			switch (keys) {
				case 'phone':
					setProfileArtisan({
						...profileArtisan,
						...{ phone: event.target.value }
					});
					break;
				case 'description':
					setProfileArtisan({
						...profileArtisan,
						...{ description: event.target.value }
					});
					break;
				default:
					console.log('Aucun changement');
			}
		};
	};

	return (
		<Form className="artisan-form">
			<Form.Item>
				<UploadAvatar role={'artisan'} profileArtisan={profileArtisan} setProfileArtisan={setProfileArtisan} />
			</Form.Item>

			<Form.Item label="Prénom/Nom" hasFeedback>
				<Input value={`${profileArtisan.firstname} ${profileArtisan.lastname}`} disabled={true} />
			</Form.Item>

			<Form.Item label="Siret" hasFeedback>
				<Input value={profileArtisan.siret} disabled />
			</Form.Item>

			<Form.Item label="Entreprise" hasFeedback>
				<Input disabled value={profileArtisan.company} />
			</Form.Item>

			<Form.Item label="Adresse" hasFeedback>
				<Input disabled value={`${profileArtisan.numberWay} ${profileArtisan.way}`} />
			</Form.Item>

			<Form.Item label="Code Postal" hasFeedback>
				<Input disabled value={profileArtisan.postalCode} />
			</Form.Item>

			<Form.Item label="Ville" hasFeedback>
				<Input disabled value={profileArtisan.city} />
			</Form.Item>

			<Form.Item label="Téléphone" hasFeedback>
				<Input onChange={handleChangeValue('phone')} value={profileArtisan.phone} />
			</Form.Item>

			<Form.Item label="Mail" hasFeedback>
				<Input disabled value={profileArtisan.email} />
			</Form.Item>

			<Form.Item label="Description" hasFeedback>
				<TextArea value={profileArtisan.description} onChange={handleChangeValue('description')} rows={4} />
			</Form.Item>

			<Form.Item>
				<UploadPictureGalery
					artisanObject={artisanObject}
					profileArtisan={profileArtisan}
					setProfileArtisan={setProfileArtisan}
				/>
			</Form.Item>

			<Form.Item>
				<ButtonSaveAccount
					profileRole="artisan"
					profileArtisan={profileArtisan}
					artisanEdit={artisanEdit}
					artisanData={artisanData}
				/>
			</Form.Item>
			<Form.Item>
				<ButtonDeleteAccount profileArtisan={profileArtisan} profileRole="artisan" />
			</Form.Item>
		</Form>
	);
};

//PropTypes
FormEditArtisan.propTypes = {
	artisanObject: PropTypes.object.isRequired,
	profileArtisan: PropTypes.object.isRequired,
	setProfileArtisan: PropTypes.func.isRequired
};

export default FormEditArtisan;
