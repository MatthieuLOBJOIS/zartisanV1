//actions type
export const ARTISAN_DATA = 'artisan/actions/ARTISAN_DATA';
export const ARTISAN_INFO = 'artisan/actions/ARTISAN_INFO';
export const ARTISAN_EDIT = 'artisan/actions/ARTISAN_EDIT';

//action creators
export const artisanData = (id, email) => ({
	type: ARTISAN_DATA,
	id,
	email
});

export const artisanInfo = (data) => ({
	type: ARTISAN_INFO,
	data
});

export const artisanEdit = (email, description, pictureAvatar, pictureGalery, phone) => ({
	type: ARTISAN_EDIT,
	email,
	description,
	pictureAvatar,
	pictureGalery,
	phone
});
