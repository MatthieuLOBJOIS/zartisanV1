//Imports of dependencies
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Upload, Icon, message, Tooltip } from 'antd';

//Local imports
import { NAME_SERVER } from 'src/store/register/actions';

//Components for page "ProfileSettingsUser and ProfileSettingsArtisan" : Implements the button upload avatar.
const UploadAvatar = ({ profileUser, setProfileUser, role, profileArtisan, setProfileArtisan }) => {
	//Hooks
	const [ loading, setLoading ] = useState(false);

	//get base64: format of picture
	const getBase64 = (img, callback) => {
		const reader = new FileReader();
		reader.addEventListener('load', () => callback(reader.result));
		reader.readAsDataURL(img);
	};

	//Condition of upload picture
	const beforeUpload = (file) => {
		const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
		if (!isJpgOrPng) {
			message.error('You can only upload JPG/PNG file!');
		}
		const isLt2M = file.size / 1024 / 1024 < 2;
		if (!isLt2M) {
			message.error('Image must smaller than 2MB!');
		}
		return isJpgOrPng && isLt2M;
	};

	// Event handle onChange: update state local for every change of picture
	const handleChange = (info) => {
		if (info.file.status === 'uploading') {
			setLoading({ loading: true });
			return;
		}
		if (info.file.status === 'done') {
			// Get this url from response in real world.
			getBase64(info.file.originFileObj, (imageUrl) => {
				if (role === 'user') {
					setProfileUser({
						...profileUser,
						...{ pictureAvatar: imageUrl }
					});
				}

				if (role === 'artisan') {
					setProfileArtisan({
						...profileArtisan,
						...{ pictureAvatar: imageUrl }
					});
				}

				return setLoading({
					imageUrl,
					loading: false
				});
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

	//Dynamic src
	let profile = '';
	if (role === 'user') {
		profile = profileUser.pictureAvatar;
	}

	if (role === 'artisan') {
		profile = profileArtisan.pictureAvatar;
	}

	return (
		<Tooltip placement="left" title="Modifier son avatar">
			<div>
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
					) : profile != '' ? (
						<img src={`${NAME_SERVER}/${profile}`} alt="avatar" style={{ width: '100%' }} />
					) : (
						uploadButton
					)}
				</Upload>
			</div>
		</Tooltip>
	);
};

//PropTypes
UploadAvatar.propTypes = {
	profileUser: PropTypes.object,
	setProfileUser: PropTypes.func,
	role: PropTypes.string.isRequired,
	profileArtisan: PropTypes.object,
	setProfileArtisan: PropTypes.func
};

export default UploadAvatar;
