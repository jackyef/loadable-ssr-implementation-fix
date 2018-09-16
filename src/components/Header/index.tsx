/**
 * Public main navigation component
 * @module Header
 */
import _ from 'lodash';
import React from 'react';

import { Logo, Btn, TypeBtnStyle } from '@tg/ui';

import { history } from '../../routes';

const styles: Styles = require('./Header.module.less');

type Styles = {
	self?: string;
	nav?: string;
};

export type Nav = Array<{
	title: string;
	onClick?: () => void;
	style?: TypeBtnStyle;
	nav?: boolean;
	url?: string;
	icon?: string | JSX.Element;
}>;

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
 * Helper component to render both navs left and right
 * without duplicating code and extra conditions
 */
const NavList = ({ items = [] }: { items?: Nav }) => (
	_.isEmpty(items) ? <nav className={ styles.nav } /> : (
		<nav className={ styles.nav }>
			<ul>{ _.map(items, item => <li key={ item.title }><Btn { ...item } /></li>) }</ul>
		</nav>
	)
);

/**
 * Header component
 */
const Header: React.SFC<Props> = ({ nav }) => {
	return (
		<header className={ styles.self }>
			<Logo history={ history } />
			<NavList items={ nav.left } />
			<NavList items={ nav.right } />
		</header>
	);
};

Header.defaultProps = defaultProps;

export default Header;
