/**
 * Header
 * Main page top header
 * with Logo/Navigation etc.
 */
import React from 'react';

// Styles
import importedStyles from './Header.module.less';
const styles: Styles = importedStyles;

type Styles = {
	self?: string;
};

type Props = {
	children?: React.ReactNode | React.ReactNode[];
};

/**
 * Header
 */
export const Header: React.FC<Props> = React.memo(({ children }) => {
	return (
		<header className={ styles.self }>
			{ children }
		</header>
	);
});
