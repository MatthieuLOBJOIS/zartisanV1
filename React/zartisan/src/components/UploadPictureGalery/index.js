/**
 * Imports of dependencies
 */
import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Upload, Icon, Modal } from 'antd';
import 'antd/dist/antd.css';
import PropTypes from 'prop-types';

import { NAME_SERVER } from 'src/store/register/actions';

const UploadPictureGalery = ({ artisanObject, profileArtisan, setProfileArtisan }) => {
	const [ fileList, setFileList ] = useState([]);
	const [ pictureFolder, setPictureFolder ] = useState({
		previewVisible: false,
		previewImage: ''
	});

	// Select artisan in the global state
	const artisanSelector = useSelector((state) => state.artisan);

	function getSecondeBase64(file) {
		return new Promise((resolve, reject) => {
			const reader = new FileReader();
			reader.readAsDataURL(file);
			reader.onload = () => resolve(reader.result);
			reader.onerror = (error) => reject(error);
		});
	}

	let arrayPicture = [];
	if (artisanObject != '') {
		arrayPicture = artisanObject.pictureFolder.map((picture) => {
			//console.log('pic', picture);
			return {
				uid: picture,
				name: picture,
				status: 'done',
				url: `${NAME_SERVER}/${picture}`,
				thumbUrl: `${NAME_SERVER}/${picture}`
			};
		});
	}

	//console.log(arrayPicture);

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

	const handlePreview = async (file) => {
		console.log(file);
		if (!file.url && !file.preview) {
			file.preview = await getSecondeBase64(file.originFileObj);
		}

		setPictureFolder({
			...pictureFolder,
			...{ previewVisible: true },
			...{ previewImage: file.url || file.preview }
		});
	};

	console.log(pictureFolder);

	const handleChangeFile = (fileList) => {
		if (fileList.file.thumbUrl != '') {
			//console.log('changefilelist', fileList.fileList);
			const urlFolder = fileList.fileList.map((file) => {
				if (file.thumbUrl != undefined) {
					const urlHttp = file.thumbUrl.indexOf('http');
					if (urlHttp == 0) {
						//console.log(file.thumbUrl);
						return file.thumbUrl.slice(22);
					}
					return file.thumbUrl;
				}
			});

			//console.log('url', urlFolder);

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
	);
};

UploadPictureGalery.propTypes = {
	artisanObject: PropTypes.object.isRequired,
	profileArtisan: PropTypes.object.isRequired,
	setProfileArtisan: PropTypes.func.isRequired
};

export default UploadPictureGalery;
