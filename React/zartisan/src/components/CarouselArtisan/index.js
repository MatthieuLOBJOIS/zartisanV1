import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import 'antd/dist/antd.css';
import { NAME_SERVER } from 'src/store/register/actions';

import { Carousel } from 'antd';

import './style.sass';

const CarouselArtisan = ({ artisanObject }) => {
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
