//Imports of dependencies
import React from 'react';
import { Spin } from 'antd';

//Local imports
import './style.sass';

//Components for transition of load request
const Loader = () => {
	return (
		<div className="loader">
			<Spin className="loader-spin" size="large" spinning={true} />
		</div>
	);
};

export default Loader;
