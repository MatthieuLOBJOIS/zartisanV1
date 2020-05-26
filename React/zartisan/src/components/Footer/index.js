//Imports of dependencies
import React from 'react';
import { Row, Typography, Tooltip } from 'antd';
import { Link } from 'react-router-dom';

//Local imports
import './style.sass';

const { Text } = Typography;

//Components generic : Implements the footer for all pages.
const Footer = () => (
	<Row type="flex" justify="space-around" align="middle" className="footer">
		<Text className="footer-text">- Z'artisan 2019</Text>
		<Tooltip placement="top" title="mentions légales">
			<Link className="legalNotice" to="/mentions-legal">
				Mentions légales
			</Link>
		</Tooltip>
	</Row>
);
export default Footer;
