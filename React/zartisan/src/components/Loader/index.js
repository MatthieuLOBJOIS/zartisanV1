import React from 'react';
import { Spin } from 'antd';
import './style.sass';
import { useLoading } from 'src/hooks/useLoading';

const Loader = () => {
	let toLoading = useLoading();
	return (
		<div className="loader">
			<Spin className="loader-spin" size="large" spinning={toLoading} />
		</div>
	);
};

export default Loader;
