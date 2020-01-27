/**
 * Main navigation (top level)
 */
import React from 'react';

// Styles
import importedStyles from './Nav.module.less';
const styles: Styles = importedStyles;

type Styles = {
	self?: string;
};

type Props = {
	children?: React.ReactNode | React.ReactNode[];

	/**
	 * User styles
	 */
	className?: string;
};

const defaultProps: Partial<Props> = {
	className: ''
};

/**
 * Nav
 */
export const Nav: React.FC<Props> = React.memo(({ children, className }) => {
	return (
		<nav className={ `${ styles.self } ${ className }` }>
			<ul>
				{children}
			</ul>
		</nav>
	);
});

Nav.defaultProps = defaultProps;
