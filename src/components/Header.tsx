/**
 * Public header
 */
import React from 'react';

import { canUseDOM } from '@scc/scc-ui-kit';

import Logo from './Logo';
import Nav from './Nav';

import { routes } from '../config';
import { history } from '../routes';

import { styles } from '../styles/components/Header';

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
