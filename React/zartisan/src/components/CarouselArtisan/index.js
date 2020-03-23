//Imports of dependencies
import React from 'react';
import PropTypes from 'prop-types';
import { Carousel } from 'antd';
import 'antd/dist/antd.css';

//Local imports
import { NAME_SERVER } from 'src/store/register/actions';
import './style.sass';

//Components for page "PageArtisan" : Implements a caroussel with four picture max
const CarouselArtisan = ({ artisanObject }) => {
	return (
		<div>
			<Carousel autoplay>
				{artisanObject.pictureFolder.map((picture) => {
					return (
						<div key={picture}>
							<h3>
								<img className="imgCarousel" src={`${NAME_SERVER}/${picture}`} alt="image-galery" />
							</h3>
						</div>
					);
				})}
			</Carousel>
		</div>
	);
};

//PropTypes
CarouselArtisan.propTypes = {
	artisanObject: PropTypes.object.isRequired
};

export default CarouselArtisan;
