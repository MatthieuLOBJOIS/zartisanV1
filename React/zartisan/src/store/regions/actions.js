//actions type
export const GET_REGIONS = 'regions/actions/GET_REGIONS';
export const REGIONS = 'regions/actions/REGIONS';

//action creators
export const getRegions = (regions = {}) => ({
	type: GET_REGIONS,
	regions
});

export const regions = (regions) => ({
	type: REGIONS,
	regions
});
