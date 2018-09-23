/**
 * Component
 * @module NavList
 */
import _ from 'lodash';
import React from 'react';

import { Btn, TypeBtnStyle } from '@tg/ui';

const styles: Styles = require('./NavList.module.less');

type Styles = {
	self?: string;
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
	items?: Nav;
};

const defaultProps: Partial<Props> = {
	items: []
};

/**
 * Helper component to render both navs left and right
 * without duplicating code and extra conditions
 */
const NavList: React.SFC<Props> = ({ items }) => (
	_.isEmpty(items) ? <nav className={ styles.self } /> : (
		<nav className={ styles.self }>
			<ul>{ _.map(items, item => <li key={ item.title }><Btn { ...item } /></li>) }</ul>
		</nav>
	)
);

NavList.defaultProps = defaultProps;

export default NavList;
