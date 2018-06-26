/**
 * Public header
 */
import React from 'react';

import { canUseDOM } from '@scc/scc-ui-kit';

import Logo from '../Elements/Logo';
import Nav from '../Elements/Nav';

import { routes } from '../../config';
import { history } from '../../routes';

import { styles } from '../../styles/components/Blocks/Header';

/**
 * Public header
 */
const Header: React.SFC<{}> = () => {
	return (
		<header className={ styles.self }>
			<div>
				<Logo to={ routes.home } history={ canUseDOM() && history } />
				<Nav />
			</div>
		</header>
	);
};

export default Header;
