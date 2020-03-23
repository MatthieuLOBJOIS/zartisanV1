//Imports of dependencies
import React from 'react';
import { Spin } from 'antd';

//Local imports
import { useLoading } from 'src/hooks/useLoading';
import './style.sass';

//Components for transition of load request
const Loader = () => {
	let toLoading = useLoading();
	return (
		<div className="loader">
			<Spin className="loader-spin" size="large" spinning={toLoading} />
		</div>
	);
};

export default Loader;
