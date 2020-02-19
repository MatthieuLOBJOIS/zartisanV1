import React from 'react';
import france from './picture/france.svg';

const FranceMap = () => {
	return (
		<object data={france} id="yoursvg" width="100%" height="100%" type="image/svg+xml">
			<img src={france} alt="Une carte de france en svg cliquable" />
		</object>
	);
};

export default FranceMap;
