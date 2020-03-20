import React, { useState, useEffect } from 'react';
import 'antd/dist/antd.css';
import { Rate, Popover } from 'antd';
import { useSelector, useDispatch } from 'react-redux';
import PropTypes from 'prop-types';

import { sendRate } from 'src/store/rate/actions';
import './style.sass';

const RateArtisan = ({ user, artisanUser, artisanObject, idArtisan, mail }) => {
	const dispatch = useDispatch();
	const averageRate = useSelector((state) => state.rate);
	const [ star, setStar ] = useState(artisanObject.averageRate);
	const [ updateStar, setUpdateStar ] = useState(null);

	useEffect(
		() => {
			setUpdateStar(averageRate);
		},
		[ averageRate ]
	);

	useEffect(
		() => {
			setStar(artisanObject.averageRate);
			setUpdateStar(null);
		},
		[ artisanObject.averageRate ]
	);

	const Rating = () => {
		if (updateStar == null) {
			return <Rate className="ratingCompany" style={{ fontSize: '1em' }} disabled defaultValue={star} />;
		} else {
			return <Rate className="ratingCompany" style={{ fontSize: '1em' }} disabled defaultValue={updateStar} />;
		}
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
		setValue(event);
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

RateArtisan.propTypes = {
	user: PropTypes.number.isRequired,
	artisanUser: PropTypes.number.isRequired,
	artisanObject: PropTypes.object.isRequired,
	idArtisan: PropTypes.number.isRequired,
	mail: PropTypes.string.isRequired
};

export default RateArtisan;
