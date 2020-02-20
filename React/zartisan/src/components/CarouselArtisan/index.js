import React, { useState, useEffect } from 'react';
import 'antd/dist/antd.css';
import { NAME_SERVER } from 'src/store/register/actions';

import { Carousel } from 'antd';

import './style.sass';

import Carousel1 from 'src/styles/pictures/caroussel/artisan10.jpg';
import Carousel2 from 'src/styles/pictures/caroussel/artisan11.jpg';
import Carousel3 from 'src/styles/pictures/caroussel/artisan12.jpg';

const CarouselArtisan = () => {
	return (
		<Carousel autoplay>
			<div>
				<h3>
					<img className="imgCarousel" src={Carousel1} alt="" />
				</h3>
			</div>
			<div>
				<h3>
					<img className="imgCarousel" src={Carousel2} alt="" />
				</h3>
			</div>
			<div>
				<h3>
					<img className="imgCarousel" src={Carousel3} alt="" />{' '}
				</h3>
			</div>
		</Carousel>
	);
};

export default CarouselArtisan;
