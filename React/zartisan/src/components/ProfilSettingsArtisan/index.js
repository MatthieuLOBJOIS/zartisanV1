/**
 * Imports of dependencies
 */
import React, { useState, useEffect } from 'react';
import { Form, Input, Row, Button, TextArea, Upload, Icon, message, Modal } from 'antd';
import { useSelector, useDispatch } from 'react-redux';
import 'antd/dist/antd.css';
import { artisanEdit } from 'src/store/artisan/actions';
import { NAME_SERVER } from 'src/store/register/actions';

const ProfilSettingsArtisan = () => {
	const dispatch = useDispatch();
	const { TextArea } = Input;
	// hooks state
	const [ loading, setLoading ] = useState(false);

	// select artisan in the state
	const artisanSelector = useSelector((state) => state.artisan);
	//console.log(artisanSelector);

	let artisanObject = {};
	for (let artisan in artisanSelector) {
		//console.log(artisanSelector[artisan]);
		artisanObject = artisanSelector[0];
	}
	console.log('object', artisanObject);

	// Avatar upload
	function getBase64(img, callback) {
		const reader = new FileReader();
		reader.addEventListener('load', () => callback(reader.result));
		reader.readAsDataURL(img);
	}

	function beforeUpload(file) {
		const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
		if (!isJpgOrPng) {
			message.error('You can only upload JPG/PNG file!');
		}
		const isLt2M = file.size / 1024 / 1024 < 2;
		if (!isLt2M) {
			message.error('Image must smaller than 2MB!');
		}
		return isJpgOrPng && isLt2M;
	}

	const handleChange = (info) => {
		if (info.file.status === 'uploading') {
			setLoading({ loading: true });
			return;
		}
		if (info.file.status === 'done') {
			// Get this url from response in real world.
			getBase64(info.file.originFileObj, (imageUrl) => {
				setPictureAvatar(imageUrl);
				return setLoading({ imageUrl, loading: false });
			});
		}
	};

	const uploadButton = (
		<div>
			<Icon type={loading ? 'loading' : 'plus'} />
			<div className="ant-upload-text">Upload</div>
		</div>
	);

	const { imageUrl } = loading;
	//console.log(imageUrl);

	//////////////////////////////////////// Wall picture upload//////////////////////////////////////////////////////////////////////

	function getSecondeBase64(file) {
		return new Promise((resolve, reject) => {
			const reader = new FileReader();
			reader.readAsDataURL(file);
			reader.onload = () => resolve(reader.result);
			reader.onerror = (error) => reject(error);
		});
	}

	const [ previewVisible, setPreviewVisible ] = useState(false);
	const [ previewImage, setPreviewImage ] = useState('');
	const [ fileList, setFileList ] = useState([ pictureGalery ]);

	const handleCancel = () => setPreviewVisible(false);

	const handlePreview = async (file) => {
		if (!file.url && !file.preview) {
			file.preview = await getSecondeBase64(file.originFileObj);
		}
		setPreviewVisible(true);
		setPreviewImage(file.url || file.preview);
	};

	const handleChangeFile = (fileList) => {
		//console.log(fileList.fileList);
		return setFileList(fileList.fileList);
	};

	const uploadButtonFile = (
		<div>
			<Icon type="plus" />
			<div className="ant-upload-text">Upload</div>
		</div>
	);

	// update profil

	// local state

	const [ description, setDescription ] = useState(artisanObject.companyDescription);
	const [ pictureAvatar, setPictureAvatar ] = useState(artisanObject.picture);
	const [ pictureGalery, setPictureGalery ] = useState(artisanObject.pictureFolder);
	const [ phoneArtisan, setPhoneArtisan ] = useState(artisanObject.phone);

	console.log('img', pictureGalery, fileList);

	useEffect(
		() => {
			setDescription(artisanObject.companyDescription);

			setPictureAvatar(artisanObject.picture);

			setPictureGalery(artisanObject.pictureFolder);

			setPhoneArtisan(artisanObject.phone);
			if (artisanObject.pictureFolder !== undefined) {
				setFileList(artisanObject.pictureFolder);
			}
		},
		[ artisanObject ]
	);

	const handleSaveClick = () => {
		dispatch(artisanEdit(artisanObject.email, description, pictureAvatar, pictureGalery, phoneArtisan));
	};

	const handleContentDescription = (event) => {
		const content = event.target.value;
		//console.log(content);
		setDescription(content);
	};

	const handlePhone = (event) => {
		const contentPhone = event.target.value;
		console.log(contentPhone);
		setPhoneArtisan(contentPhone);
	};

	return (
		<div>
			<Row type="flex" justify="space-around" align="middle">
				<Form className="artisan-form">
					<Form.Item>
						<Upload
							name="avatar"
							listType="picture-card"
							className="avatar-uploader"
							showUploadList={false}
							action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
							beforeUpload={beforeUpload}
							onChange={handleChange}
						>
							{imageUrl ? (
								<img src={imageUrl} alt="avatar" style={{ width: '100%' }} />
							) : artisanObject.picture != undefined ? (
								<img
									src={`${NAME_SERVER}/${artisanObject.picture}`}
									alt="avatar"
									style={{ width: '100%' }}
								/>
							) : (
								uploadButton
							)}
						</Upload>
					</Form.Item>

					<Form.Item label="Prénom/Nom" hasFeedback>
						<Input value={`${artisanObject.firstname} ${artisanObject.lastname}`} disabled={true} />
					</Form.Item>

					<Form.Item label="Siret" hasFeedback>
						<Input value={artisanObject.siret} disabled />
					</Form.Item>

					<Form.Item label="Entreprise" hasFeedback>
						<Input disabled value={artisanObject.company} />
					</Form.Item>

					<Form.Item label="Adresse" hasFeedback>
						<Input disabled value={`${artisanObject.numberWay} ${artisanObject.way}`} />
					</Form.Item>

					<Form.Item label="Code Postal" hasFeedback>
						<Input disabled value={artisanObject.postalCode} />
					</Form.Item>

					<Form.Item label="Ville" hasFeedback>
						<Input disabled value={artisanObject.city} />
					</Form.Item>

					<Form.Item label="Téléphone" hasFeedback>
						<Input onChange={handlePhone} value={phoneArtisan} />
					</Form.Item>

					<Form.Item label="Mail" hasFeedback>
						<Input disabled value={artisanObject.email} />
					</Form.Item>

					<Form.Item label="Description" hasFeedback>
						<TextArea value={description} onChange={handleContentDescription} rows={4} />
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
			</Row>
		</div>
	);
};

export default ProfilSettingsArtisan;
