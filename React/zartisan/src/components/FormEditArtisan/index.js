/**
 * Imports of dependencies
 */
import React, { useState, useEffect } from 'react';
import { Form, Input, Row, Button, TextArea, Upload, Icon, message, Modal } from 'antd';
import { useSelector, useDispatch } from 'react-redux';
import 'antd/dist/antd.css';
import { artisanEdit } from 'src/store/artisan/actions';
import { NAME_SERVER } from 'src/store/register/actions';
import UploadAvatar from 'src/components/UploadAvatar';

const FormEditArtisan = ({ profileArtisan, setProfileArtisan }) => {
	//==================================================================================================
	const dispatch = useDispatch();
	const { TextArea } = Input;

	//////////////////////////////////////// Wall picture upload//////////////////////////////////////////////////////////////////////

	function getSecondeBase64(file) {
		return new Promise((resolve, reject) => {
			const reader = new FileReader();
			reader.readAsDataURL(file);
			reader.onload = () => resolve(reader.result);
			reader.onerror = (error) => reject(error);
		});
	}

	//------------------------------------------------------------------------------------------------------------------------------
	// State local picture folder
	const [ previewVisible, setPreviewVisible ] = useState(false);
	const [ previewImage, setPreviewImage ] = useState('');
	const [ fileList, setFileList ] = useState([]);

	useEffect(
		() => {
			let urlGaleryPicture = [];

			if (fileList.length >= 0) {
				for (let objectFile in fileList) {
					urlGaleryPicture.push(fileList[objectFile].thumbUrl);
				}
				setProfileArtisan({
					...profileArtisan,
					...{ pictureGalery: urlGaleryPicture }
				});
			}
		},
		[ fileList ]
	);
	//------------------------------------------------------------------------------------------------------------------------------

	const handleCancel = () => setPreviewVisible(false);

	const handlePreview = async (file) => {
		if (!file.url && !file.preview) {
			file.preview = await getSecondeBase64(file.originFileObj);
		}
		setPreviewVisible(true);
		setPreviewImage(file.url || file.preview);
	};

	const handleChangeFile = (fileList) => {
		if (fileList.file.thumbUrl != '') {
			return setFileList(fileList.fileList);
		}
	};

	const uploadButtonFile = (
		<div>
			<Icon type="plus" />
			<div className="ant-upload-text">Upload</div>
		</div>
	);

	// update profil

	// local state

	//------------------------------------------------------------------------------------------------------------------------------

	//------------------------------------------------------------------------------------------------------------------------------

	//------------------------------------------------------------------------------------------------------------------------------

	const handleSaveClick = () => {
		dispatch(
			artisanEdit(
				profileArtisan.email,
				profileArtisan.description,
				profileArtisan.pictureAvatar,
				profileArtisan.pictureGalery,
				profileArtisan.phone
			)
		);
	};

	const handleContentDescription = (event) => {
		const content = event.target.value;
		setProfileArtisan({
			...profileArtisan,
			...{ description: content }
		});
	};

	const handlePhone = (event) => {
		const contentPhone = event.target.value;
		setProfileArtisan({
			...profileArtisan,
			...{ phone: contentPhone }
		});
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
				<Input onChange={handlePhone} value={profileArtisan.phone} />
			</Form.Item>

			<Form.Item label="Mail" hasFeedback>
				<Input disabled value={profileArtisan.email} />
			</Form.Item>

			<Form.Item label="Description" hasFeedback>
				<TextArea value={profileArtisan.description} onChange={handleContentDescription} rows={4} />
			</Form.Item>

			<Form.Item>
				<Upload
					action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
					listType="picture-card"
					//fileList={fileList}
					onPreview={handlePreview}
					onChange={handleChangeFile}
				>
					{fileList.length >= 4 ? null : uploadButtonFile}
				</Upload>
				<Modal visible={previewVisible} footer={null} onCancel={handleCancel}>
					<img alt="example" style={{ width: '100%' }} src={previewImage} />
				</Modal>
			</Form.Item>

			<Form.Item>
				<Button onClick={handleSaveClick} type="primary" className="buttons" htmlType="submit">
					Sauvegarder
				</Button>
			</Form.Item>
			<Form.Item>
				<Button type="danger" htmlType="submit">
					Supprimer le compte
				</Button>
			</Form.Item>
		</Form>
	);
};

export default FormEditArtisan;
