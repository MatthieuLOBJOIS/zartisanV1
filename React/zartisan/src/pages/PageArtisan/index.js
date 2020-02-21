import React from 'react';
import 'antd/dist/antd.css';
import { NAME_SERVER } from 'src/store/register/actions';

import { Row, Col, Button, Popover } from 'antd';
import { useSelector } from 'react-redux';

import './style.sass';
import cookies from 'js-cookie';
import CarouselArtisan from 'src/components/CarouselArtisan';
import RateArtisan from 'src/components/RateArtisan';
import AdviceArtisan from 'src/components/AdviceArtisan';
import Loader from 'src/components/Loader';

const PageArtisan = () => {
	const artisanSelector = useSelector((state) => state.artisan);

	let artisanObject = '';
	let adviceObject = [];
	for (let artisan in artisanSelector) {
		artisanObject = artisanSelector[0];
		adviceObject = artisanSelector[1];
	}

	const connect = useSelector((state) => state.connect);
	let token = '';
	if (connect === true) {
		token = cookies.get('TOKEN');
	}

	let parseJwt = (token) => {
		try {
			return JSON.parse(atob(token.split('.')[1]));
		} catch (e) {
			return null;
		}
	};

	let user = -1;
	let artisanUser = -1;
	let mail = '';
	if (parseJwt(token) != null) {
		user = parseJwt(token).roles.indexOf('ROLE_USER');
		artisanUser = parseJwt(token).roles.indexOf('ROLE_ARTISAN');
		mail = parseJwt(token).username;
	}

	let phone = '';
	artisanObject.phone != undefined ? (phone = artisanObject.phone.slice(1)) : phone;

	const idArtisan = artisanObject.id;
	const emailArtisan = artisanObject.email;

	// contact

	const contentContact = (
		<div>
			<p>Pour accéder aux informations de contact veuillez-vous enregistrer et valider votre adresse email</p>
		</div>
	);

	const ButtonContact = () => {
		return (
			<Popover placement="bottom" content={contentContact} trigger="click">
				<Button className="buttons" className="buttonInscription">
					Contacter
				</Button>
			</Popover>
		);
	};

	return (
		<div>
			<Row type="flex" justify="space-around" align="middle">
				{artisanObject != '' ? (
					<div id="page-artisan">
						<Row>
							<div className="page-artisan-description">
								<Row>
									<div>
										<div id="companyName">
											<h4>{artisanObject.company}</h4>
										</div>
									</div>
								</Row>
								<div className="artisan-description">
									<Row>
										<Col span={12}>
											<div>
												<img
													className="description-picture"
													src={`${NAME_SERVER}/${artisanObject.picture}`}
												/>
												<RateArtisan
													user={user}
													artisanUser={artisanUser}
													artisanObject={artisanObject}
													idArtisan={idArtisan}
													mail={mail}
												/>
											</div>
										</Col>
										<Col span={12}>
											<div className="description-info">
												<div>
													{artisanObject.numberWay} {artisanObject.typeWay}{' '}
													{artisanObject.way} {artisanObject.postalCode} {artisanObject.city}
												</div>
											</div>
										</Col>

										{user !== -1 || artisanUser !== -1 ? (
											<Col span={24}>
												<div className="divDescriptionEmailPhone">
													<p>
														Email :{' '}
														<a href={`mailto:${artisanObject.email}`}>
															{artisanObject.email}
														</a>
													</p>
													<p>
														Téléphone :{' '}
														<a href={`tel:+33${phone}`}>{artisanObject.phone}</a>
													</p>
												</div>
											</Col>
										) : (
											<ButtonContact />
										)}
										<Col span={24}>
											<div>
												<p>{artisanObject.companyDescription}</p>
											</div>
										</Col>
									</Row>
								</div>
							</div>
						</Row>

						<div className="page-artisan-caroussel">
							<CarouselArtisan />
						</div>

						<div className="page-artisan-commentary">
							<AdviceArtisan
								user={user}
								artisanUser={artisanUser}
								adviceObject={adviceObject}
								mail={mail}
								idArtisan={idArtisan}
								emailArtisan={emailArtisan}
							/>
						</div>
					</div>
				) : (
					<Loader />
				)}
			</Row>
		</div>
	);
};
export default PageArtisan;
