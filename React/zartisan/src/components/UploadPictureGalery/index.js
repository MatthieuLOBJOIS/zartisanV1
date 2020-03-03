/**
 * Imports of dependencies
 */
import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Upload, Icon, Modal } from 'antd';
import { NAME_SERVER } from 'src/store/register/actions';
import 'antd/dist/antd.css';

const UploadPictureGalery = ({ profileArtisan, setProfileArtisan }) => {
	const [ fileList, setFileList ] = useState([]);
	const [ pictureFolder, setPictureFolder ] = useState({
		previewVisible: false,
		previewImage: ''
	});

	// Select artisan in the global state
	const artisanSelector = useSelector((state) => state.artisan);
	let artisanObject = '';
	for (let artisan in artisanSelector) {
		artisanObject = artisanSelector[0];
	}

	//console.log(artisanObject);

	function getSecondeBase64(file) {
		return new Promise((resolve, reject) => {
			const reader = new FileReader();
			reader.readAsDataURL(file);
			reader.onload = () => resolve(reader.result);
			reader.onerror = (error) => reject(error);
		});
	}

	const arrayPicture = artisanObject.pictureFolder.map((picture) => {
		//console.log('pic', picture);
		return {
			uid: picture,
			name: picture,
			status: 'done',
			url: `${NAME_SERVER}/${picture}`,
			thumbUrl: `${NAME_SERVER}/${picture}`
		};
	});

	//console.log(arrayPicture);

	useEffect(
		() => {
			if (artisanObject != '') {
				setFileList(arrayPicture);
			}
		},
		[ artisanObject ]
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

export default UploadPictureGalery;
