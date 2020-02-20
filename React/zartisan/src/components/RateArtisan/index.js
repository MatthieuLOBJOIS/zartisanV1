import React, { useState } from 'react';
import 'antd/dist/antd.css';
import { Rate, Popover } from 'antd';
import { useSelector, useDispatch } from 'react-redux';

import './style.sass';
import { sendRate } from 'src/store/rate/actions';

const RateArtisan = ({ user, artisanUser, artisanObject, idArtisan, mail }) => {
	const dispatch = useDispatch();
	const averageRate = useSelector((state) => state.rate);
	//console.log('note moyenne', averageRate);

	if (averageRate != null) {
		artisanObject.averageRate = averageRate;
	}

	const Rating = () => {
		return (
			<Rate
				className="ratingCompany"
				style={{ fontSize: '1em' }}
				disabled
				defaultValue={artisanObject.averageRate}
			/>
		);
	};

	/**Hooks for display popover of rate link */
	const [ visibleRate, setVisibleRate ] = useState(false);
	const [ value, setValue ] = useState(null);

	/**
   * open popover
   */
	const handleVisibleChange = () => {
		setVisibleRate(true);
	};

	/**
   * close popover
   */
	const hide = () => {
		setVisibleRate(false);
	};

	const handleChange = (event) => {
		//console.log(event);
		setValue(event);
		//console.log("vote", event, "mail", mail, "id", idArtisan);
		dispatch(sendRate(idArtisan, mail, event));
	};

	const content = (
		<div onClick={hide}>
			<p>Evaluer votre artisan :</p>
			<Rate onChange={handleChange} value={value} />
		</div>
	);

	return (
		<div>
			<Rating />
			{user !== -1 || artisanUser !== -1 ? (
				<div>
					<Popover
						placement="bottom"
						trigger="click"
						onVisibleChange={handleVisibleChange}
						visible={visibleRate}
						content={content}
					>
						<a className="evaluez">évaluez</a>
					</Popover>
				</div>
			) : (
				''
			)}
		</div>
	);
};

export default RateArtisan;
