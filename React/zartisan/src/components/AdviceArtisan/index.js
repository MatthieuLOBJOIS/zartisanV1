import React, { useState } from 'react';
import 'antd/dist/antd.css';
import { NAME_SERVER } from 'src/store/register/actions';

import { Row, Col, Button, List, Comment, Popover, Icon, Form, Input, Modal } from 'antd';
import { useDispatch } from 'react-redux';

import './style.sass';
import { alertAdvice } from 'src/store/advice/actions';
import { sendAdvice } from 'src/store/advice/actions';
import { artisanData } from 'src/store/artisan/actions';

const AdviceArtisan = ({ user, artisanUser, adviceObject, mail, idArtisan, emailArtisan }) => {
	const { TextArea } = Input;
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
		//console.log(valueArea);
		changeValueArea(valueArea);
	};

	const handleAreaComment = (event) => {
		event.preventDefault();
		hidePopAdvice();
		dispatch(sendAdvice(mail, idArtisan, changeAdvice));

		setTimeout(() => {
			dispatch(artisanData(idArtisan, emailArtisan));
		}, 2000);
	};

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

	const contentAdvice = (
		<div>
			<p>Pour accéder aux commentaires veuillez-vous enregistrer et valider votre adresse email</p>
		</div>
	);

	const ButtonAdvice = () => {
		const handleAdvice = () => {
			if (user !== -1 || artisanUser !== -1) {
				//console.log("commentaire");
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

	/**
   * report a advice
   */

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
								{console.log(item, 'itemlog')}
								<Comment
									author={item.userAuthor.firstname}
									avatar={`${NAME_SERVER}/${item.userAuthor.picture}`}
									content={item.body}
									datetime={
										<div>
											{item.createdAt}{' '}
											<Button id="design" value={item.id} onClick={handleAlert}>
												{item.isReported ? (
													<Icon style={{ color: 'red' }} type="alert" />
												) : (
													<Icon type="alert" />
												)}
											</Button>
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

export default AdviceArtisan;
