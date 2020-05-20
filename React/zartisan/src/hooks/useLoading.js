//Imports of dependencies
import { useState, useEffect } from 'react';

export const useLoading = () => {
	const [ loading, setLoading ] = useState(true);

	const changeLoadValue = () => {
		setTimeout(() => {
			setLoading(false);
		}, 200);
	};

	useEffect(() => {
		changeLoadValue();
	}, []);

	return loading;
};
