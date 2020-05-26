//Imports of dependencies
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import 'antd/dist/antd.css';
import { Row, Button, Icon, Drawer, Tooltip } from 'antd';

//Local imports
import { NAME_SERVER } from 'src/store/register/actions';
import './style.sass';

//Components
import ShowAccount from 'src/components/ShowAccount';

//Components generic : Implements the header for all pages.
const Header = () => {
	//Hooks
	const [ visible, setVisible ] = useState(false);

	//Open menu burger
	const showDrawer = () => {
		setVisible(true);
	};

	//Close menu burger
	const onClose = () => {
		setVisible(false);
	};

	return (
		<div>
			<Row className="header" type="flex" justify="space-around">
				<Button className="header-burger-button header-burger-button--hidden" onClick={showDrawer}>
					<Icon type="menu" />
				</Button>
				<Drawer placement="top" onClose={onClose} visible={visible} closable={true}>
					<Row type="flex" justify="center" align="top">
						<img
							src={`${NAME_SERVER}/assets/images_default/zartisan.svg`}
							alt="zartisan image"
							className="logo-zartisan drawer"
						/>
					</Row>
					<ShowAccount onClose={onClose} hidden={false} />
				</Drawer>
				<ShowAccount onClose={onClose} hidden={true} />
				<Tooltip placement="right" title="Retour à l'accueil">
					<Link to="/">
						<img
							src={`${NAME_SERVER}/assets/images_default/zartisan.svg`}
							alt="zartisan image"
							className="logo-zartisan"
						/>
					</Link>
				</Tooltip>
			</Row>
		</div>
	);
};

export default Header;
