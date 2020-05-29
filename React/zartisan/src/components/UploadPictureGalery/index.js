//Imports of dependencies
import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import 'antd/dist/antd.css';
import { Upload, Icon, Modal, Tooltip } from 'antd';

//Local imports
import { NAME_SERVER } from 'src/store/register/actions';

//Components for page " ProfileSettingsArtisan" : Implements the button upload galery picture.
const UploadPictureGalery = ({ artisanObject, profileArtisan, setProfileArtisan }) => {
	//Hooks
	const [ fileList, setFileList ] = useState([]);
	const [ pictureFolder, setPictureFolder ] = useState({
		previewVisible: false,
		previewImage: ''
	});

	const artisanSelector = useSelector((state) => state.artisan.artisan);

	//get base64: format of picture
	function getSecondeBase64(file) {
		return new Promise((resolve, reject) => {
			const reader = new FileReader();
			reader.readAsDataURL(file);
			reader.onload = () => resolve(reader.result);
			reader.onerror = (error) => reject(error);
		});
	}

	//Select currently picture gallery
	let arrayPicture = [];
	if (artisanObject != '') {
		arrayPicture = artisanObject.pictureFolder.map((picture) => {
			return {
				uid: picture,
				name: picture,
				status: 'done',
				url: `${NAME_SERVER}/${picture}`,
				thumbUrl: `${NAME_SERVER}/${picture}`
			};
		});
	}

	//Update picture gallery
	useEffect(
		() => {
			if (artisanObject != '') {
				setFileList(arrayPicture);
			}
		},
		[ artisanSelector ]
	);

	const handleCancel = () =>
		setPictureFolder({
			...pictureFolder,
			...{ previewVisible: false }
		});

	//Display a modal for preview a picture
	const handlePreview = async (file) => {
		if (!file.url && !file.preview) {
			file.preview = await getSecondeBase64(file.originFileObj);
		}

		setPictureFolder({
			...pictureFolder,
			...{ previewVisible: true },
			...{ previewImage: file.url || file.preview }
		});
	};

	//Update and fix array picture gallery for backend process
	const handleChangeFile = (fileList) => {
		if (fileList.file.thumbUrl != '') {
			const urlFolder = fileList.fileList.map((file) => {
				if (file.thumbUrl != undefined) {
					const urlHttp = file.thumbUrl.indexOf('http');
					if (urlHttp == 0) {
						return file.thumbUrl.slice(22);
					}
					return file.thumbUrl;
				}
			});

			setProfileArtisan({
				...profileArtisan,
				...{ pictureGalery: urlFolder }
			});
			return setFileList(fileList.fileList);
		}
	};

	const uploadButtonFile = (
		<div>
			<Icon type="plus" />
			<div className="ant-upload-text">Upload</div>
		</div>
	);

	return (
		<Tooltip placement="left" title="Modifier son avatar">
			<div>
				<Upload
					action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
					listType="picture-card"
					onPreview={handlePreview}
					onChange={handleChangeFile}
					fileList={fileList}
				>
					{fileList.length >= 4 ? null : uploadButtonFile}
				</Upload>
				<Modal visible={pictureFolder.previewVisible} footer={null} onCancel={handleCancel}>
					<img alt="example" style={{ width: '100%' }} src={pictureFolder.previewImage} />
				</Modal>
			</div>
		</Tooltip>
	);
};

//PropTypes
UploadPictureGalery.propTypes = {
	artisanObject: PropTypes.object.isRequired,
	profileArtisan: PropTypes.object.isRequired,
	setProfileArtisan: PropTypes.func.isRequired
};

export default UploadPictureGalery;
