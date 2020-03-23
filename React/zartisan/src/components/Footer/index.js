//Imports of dependencies
import React from 'react';
import { Row, Typography } from 'antd';
import { Link } from 'react-router-dom';

//Local imports
import './style.sass';

const { Text } = Typography;

//Components generic : Implements the footer for all pages.
const Footer = () => (
	<Row type="flex" justify="space-around" align="middle" className="footer">
		<Text className="footer-text">- Z'artisan 2019</Text>
		<Link className="legalNotice" to="/mentions-legal">
			Mentions légales
		</Link>
	</Row>
);
export default Footer;
