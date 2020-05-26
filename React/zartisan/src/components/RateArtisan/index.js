//Imports of dependencies
import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useSelector, useDispatch } from 'react-redux';
import 'antd/dist/antd.css';
import { Rate, Popover, Tooltip } from 'antd';

//Local imports
import { sendRate } from 'src/store/rate/actions';
import './style.sass';

//Components for page "PageArtisan" : Display rate popover
const RateArtisan = ({ user, artisanUser, artisanObject, idArtisan, mail }) => {
	//Hooks
	const dispatch = useDispatch();
	const averageRate = useSelector((state) => state.rate);
	const [ star, setStar ] = useState(artisanObject.averageRate);
	const [ updateStar, setUpdateStar ] = useState(null);
	const [ visibleRate, setVisibleRate ] = useState(false);
	const [ value, setValue ] = useState(null);

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

	//Open popover
	const handleVisibleChange = () => {
		setVisibleRate(true);
	};

	//Close popover
	const hide = () => {
		setVisibleRate(false);
	};

	const Rating = () => {
		if (updateStar == null) {
			return <Rate className="ratingCompany" style={{ fontSize: '1em' }} disabled defaultValue={star} />;
		} else {
			return <Rate className="ratingCompany" style={{ fontSize: '1em' }} disabled defaultValue={updateStar} />;
		}
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
						<Tooltip placement="left" title="Evaluer l'artisan">
							<a className="evaluez">évaluez</a>
						</Tooltip>
					</Popover>
				</div>
			) : (
				''
			)}
		</div>
	);
};

//PropTypes
RateArtisan.propTypes = {
	user: PropTypes.number.isRequired,
	artisanUser: PropTypes.number.isRequired,
	artisanObject: PropTypes.object.isRequired,
	idArtisan: PropTypes.number.isRequired,
	mail: PropTypes.string.isRequired
};

export default RateArtisan;
