import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getRegions } from 'src/store/regions/actions';

export const useRegion = () => {
	const dispatch = useDispatch();
	useEffect(() => {
		dispatch(getRegions());
	}, []);

	const regions = useSelector((state) => state.regions);
	return regions;
};
