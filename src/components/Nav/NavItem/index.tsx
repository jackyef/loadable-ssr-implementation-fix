/**
 * Navigation item container
 */
import React from 'react';

// Styles
import importedStyles from './NavItem.module.less';
const styles: Styles = importedStyles;

type Styles = {
	self?: string;
};

type Props = {
	children?: React.ReactNode | React.ReactNode[];
};

/**
 * Nav item
 */
export const NavItem: React.FC<Props> = React.memo(({ children }) => {
	return (
		<li className={ styles.self }>
			{children}
		</li>
	);
});
