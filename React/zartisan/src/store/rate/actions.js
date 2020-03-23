//actions type
export const SEND_RATE = 'rate/actions/SEND_RATE';
export const RATE = 'rate/actions/RATE';

//action creators
export const sendRate = (id, mail, value) => ({
	type: SEND_RATE,
	id,
	mail,
	value
});

export const rate = (averageRate) => ({
	type: RATE,
	averageRate
});
