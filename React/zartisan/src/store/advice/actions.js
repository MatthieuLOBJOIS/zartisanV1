//actions type
export const ALERT_ADVICE = 'advice/actions/ALERT_ADVICE';
export const ALERT_SUCCESS = 'advice/actions/ALERT_SUCCESS';
export const SEND_ADVICE = 'advice/actions/SEND_ADVICE';
export const ADVICE = 'advice/actions/ADVICE';

//action creators
export const advice = (adviceResponse) => ({
	type: ADVICE,
	adviceResponse
});

export const sendAdvice = (mail, idArtisan, body) => ({
	type: SEND_ADVICE,
	mail,
	idArtisan,
	body
});

export const alertSuccess = (response) => ({
	type: ALERT_SUCCESS,
	response
});

export const alertAdvice = (id) => ({
	type: ALERT_ADVICE,
	id
});
