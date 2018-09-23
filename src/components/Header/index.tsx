/**
 * Public main navigation component
 * @module Header
 */
import React from 'react';

import { Logo } from '@tg/ui';

import NavList, { Nav } from '../NavList';
import { history } from '../../routes';

const styles: Styles = require('./Header.module.less');

type Styles = {
	self?: string;
	nav?: string;
};

type Props = {
	nav?: {
		left?: Nav;
		right?: Nav;
	};
};

const defaultProps: Partial<Props> = {
	nav: {
		left: [],
		right: []
	}
};

/**
 * Header component
 */
const Header: React.SFC<Props> = ({ nav }) => {
	return (
		<header className={ styles.self }>
			<Logo history={ history } to={ '/public' } />
			<NavList items={ nav.left } />
			<NavList items={ nav.right } />
		</header>
	);
};

Header.defaultProps = defaultProps;

export default Header;
