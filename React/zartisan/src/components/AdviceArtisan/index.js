//Imports of dependencies
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';

import { Row, Col, Button, List, Comment, Popover, Icon, Form, Input, Modal, Tooltip } from 'antd';
import 'antd/dist/antd.css';

//Local imports
import { NAME_SERVER } from 'src/store/register/actions';
import { sendAdvice } from 'src/store/advice/actions';
import { alertAdvice } from 'src/store/advice/actions';
import { artisanData } from 'src/store/artisan/actions';
import './style.sass';

//Components for page "PageArtisan" : Implements the differents advice message for a artisan.
const AdviceArtisan = ({ user, artisanUser, adviceObject, mail, idArtisan, emailArtisan }) => {
	const { TextArea } = Input;

	//Hooks
	const dispatch = useDispatch();
	const [ visibleSendAdvice, setVisibleSendAdvice ] = useState(false);
	const [ changeAdvice, setChangeAdvice ] = useState(null);

	const visiblePopAdvice = () => {
		setVisibleSendAdvice(true);
	};

	const hidePopAdvice = () => {
		setVisibleSendAdvice(false);
	};

	const changeValueArea = (valueArea) => {
		setChangeAdvice(valueArea);
	};

	const changeArea = (value) => {
		let valueArea = value.target.value;
		changeValueArea(valueArea);
	};

	//Form to send an advice
	const handleAreaComment = (event) => {
		event.preventDefault();
		hidePopAdvice();
		dispatch(sendAdvice(mail, idArtisan, changeAdvice));

		setTimeout(() => {
			dispatch(artisanData(idArtisan, emailArtisan));
		}, 2000);
	};

	//If user is connected display areaComment
	const areaComment = (
		<div>
			<Form onSubmit={handleAreaComment}>
				<Form.Item>
					<TextArea rows={4} onChange={changeArea} />
				</Form.Item>
				<Form.Item>
					<Button htmlType="submit" className="buttons">
						Envoyer
					</Button>
				</Form.Item>
			</Form>
		</div>
	);

	//If user is disconnected display contentAdvice
	const contentAdvice = (
		<div>
			<p>Pour accéder aux commentaires veuillez-vous enregistrer et valider votre adresse email</p>
		</div>
	);

	//Button for display areaComment or contentAdvice
	//user = -1 if is not connected
	const ButtonAdvice = () => {
		const handleAdvice = () => {
			if (user !== -1 || artisanUser !== -1) {
				visiblePopAdvice();
			}
		};

		if (user !== -1 || artisanUser !== -1) {
			return (
				<Button onClick={handleAdvice} className="buttons">
					Donnez votre avis
				</Button>
			);
		} else {
			return (
				<Popover placement="bottom" content={contentAdvice} trigger="click">
					<div>
						<Button className="buttons">Donnez votre avis</Button>
					</div>
				</Popover>
			);
		}
	};
	//Alert a illegal advice
	//setTimout for activate artisanData() after alertAdvice() and avoid conflict
	const handleAlert = (event) => {
		dispatch(alertAdvice(event.target.value));

		setTimeout(() => {
			dispatch(artisanData(idArtisan, emailArtisan));
		}, 2000);
	};

	return (
		<div>
			<Row>
				<Col span={24} id="back-patch">
					<ButtonAdvice />
					<Modal footer={null} visible={visibleSendAdvice} onCancel={hidePopAdvice}>
						{areaComment}
					</Modal>
				</Col>
			</Row>

			{user !== -1 || artisanUser !== -1 ? (
				<div id="background-com">
					<div id="com">
						{adviceObject.length} <Icon type="message" />
					</div>
					<List
						className="comment-list"
						id="comment"
						itemLayout="horizontal"
						dataSource={adviceObject}
						renderItem={(item) => (
							<li>
								<Comment
									author={item.userAuthor.firstname}
									avatar={`${NAME_SERVER}/${item.userAuthor.picture}`}
									content={item.body}
									datetime={
										<div>
											{item.createdAt}{' '}
											<Tooltip placement="right" title="Alerter un message indésirable">
												<Button id="design" value={item.id} onClick={handleAlert}>
													{item.isReported ? (
														<Icon style={{ color: 'red' }} type="alert" />
													) : (
														<Icon type="alert" />
													)}
												</Button>
											</Tooltip>
										</div>
									}
								/>
							</li>
						)}
					/>
				</div>
			) : (
				''
			)}
		</div>
	);
};

//PropTypes
AdviceArtisan.propTypes = {
	user: PropTypes.number.isRequired,
	artisanUser: PropTypes.number.isRequired,
	adviceObject: PropTypes.array.isRequired,
	mail: PropTypes.string.isRequired,
	idArtisan: PropTypes.number.isRequired,
	emailArtisan: PropTypes.string.isRequired
};

export default AdviceArtisan;
