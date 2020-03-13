/**
 * Imports of dependencies
 */

import React, { useState, useEffect } from 'react';
import { Row, Col, Button, Icon, Drawer, Typography } from 'antd';
import 'antd/dist/antd.css';
import { Link, useHistory } from 'react-router-dom';

/**
 * Local imports
 */
import './style.sass';
import logo from './picture/logo-zartisan.svg';
import ShowAccount from 'src/components/ShowAccount';
/**
 * Code
 */

const Header = () => {
	/**Hooks for display or not menu burger */
	const [ visible, setVisible ] = useState(false);

	//open menu burger
	const showDrawer = () => {
		setVisible(true);
	};

	//close menu burger
	const onClose = () => {
		setVisible(false);
	};

	return (
		<div>
			<Row className="header" type="flex" justify="space-around">
				{/** Button Burger */}
				<Button className="header-burger-button header-burger-button--hidden" onClick={showDrawer}>
					<Icon type="menu" />
				</Button>

				{/** Menu of Burger */}
				<Drawer placement="top" onClose={onClose} visible={visible} closable={true}>
					<Row type="flex" justify="center" align="top">
						<img src={logo} alt="zartisan image" className="logo-zartisan" />
					</Row>
					<ShowAccount onClose={onClose} hidden={false} />
				</Drawer>
				<ShowAccount onClose={onClose} hidden={true} />

				{/** logo header */}
				<Link to="/">
					<img src={logo} alt="zartisan image" className="logo-zartisan" />
				</Link>
			</Row>
		</div>
	);
};

export default Header;
