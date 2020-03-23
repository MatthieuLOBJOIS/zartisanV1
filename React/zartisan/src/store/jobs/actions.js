//actions type
export const GET_JOBS = 'jobs/actions/GET_JOBS';
export const JOBS = 'jobs/actions/JOBS';

//action creators
export const getJobs = (region) => ({
	type: GET_JOBS,
	region
});

export const jobs = (jobs) => ({
	type: JOBS,
	jobs
});
