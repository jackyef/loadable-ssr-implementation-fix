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
	className?: string;
	children?: React.ReactNode | React.ReactNode[];
};

const defaultProps: Partial<Props> = {
	className: ''
};

/**
 * Nav item
 */
export const NavItem: React.FC<Props> = React.memo(({ children, className }) => {
	return ( 
		<li className={ `${ styles.self } ${ className }` }>
			{children}
		</li>
	);
});

NavItem.defaultProps = defaultProps;
