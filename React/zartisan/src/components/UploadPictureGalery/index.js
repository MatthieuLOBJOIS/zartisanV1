/**
 * Imports of dependencies
 */
import React, { useState, useEffect } from 'react';
import { Upload, Icon, Modal } from 'antd';

import 'antd/dist/antd.css';

const UploadPictureGalery = ({ profileArtisan, setProfileArtisan }) => {
	function getSecondeBase64(file) {
		return new Promise((resolve, reject) => {
			const reader = new FileReader();
			reader.readAsDataURL(file);
			reader.onload = () => resolve(reader.result);
			reader.onerror = (error) => reject(error);
		});
	}

	const [ fileList, setFileList ] = useState([]);
	const [ pictureFolder, setPictureFolder ] = useState({
		previewVisible: false,
		previewImage: ''
	});

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

	const handleCancel = () => setPreviewVisible(false);

	const handlePreview = async (file) => {
		if (!file.url && !file.preview) {
			file.preview = await getSecondeBase64(file.originFileObj);
		}

		setPictureFolder(...pictureFolder, ...{ previewVisible: true });
		setPictureFolder(...pictureFolder, ...{ previewImage: file.url || file.preview });
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

	return (
		<div>
			<Upload
				action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
				listType="picture-card"
				onPreview={handlePreview}
				onChange={handleChangeFile}
			>
				{fileList.length >= 4 ? null : uploadButtonFile}
			</Upload>
			<Modal visible={pictureFolder.previewVisible} footer={null} onCancel={handleCancel}>
				<img alt="example" style={{ width: '100%' }} src={pictureFolder.previewImage} />
			</Modal>
		</div>
	);
};

export default UploadPictureGalery;
