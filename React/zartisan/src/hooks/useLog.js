//Imports of dependencies
import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';

export const useLog = () => {
	const [ sessionConnect, setSessionConnect ] = useState(null);

	const logState = useSelector((state) => state.connect);
	useEffect(
		() => {
			setSessionConnect(localStorage.getItem('Connect'));
		},
		[ logState ]
	);
	return sessionConnect;
};
