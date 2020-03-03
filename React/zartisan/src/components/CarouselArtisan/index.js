import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import 'antd/dist/antd.css';
import { NAME_SERVER } from 'src/store/register/actions';

import { Carousel } from 'antd';

import './style.sass';

import Carousel1 from 'src/styles/pictures/caroussel/artisan10.jpg';

const CarouselArtisan = () => {
	// Select artisan in the global state
	const artisanSelector = useSelector((state) => state.artisan);
	let artisanObject = '';
	for (let artisan in artisanSelector) {
		artisanObject = artisanSelector[0];
	}
	//console.log(artisanObject);
	return (
		<Carousel autoplay>
			{artisanObject.pictureFolder.map((picture) => {
				//console.log(picture);
				return (
					<div key={picture}>
						<h3>
							<img className="imgCarousel" src={`${NAME_SERVER}/${picture}`} alt="image-galery" />
						</h3>
					</div>
				);
			})}
		</Carousel>
	);
};

export default CarouselArtisan;
