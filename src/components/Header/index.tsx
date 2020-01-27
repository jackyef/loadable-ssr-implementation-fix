/**
 * Header
 * Main page top header
 * with Logo/Navigation etc.
 */
import React from 'react';

import { ContentBlock } from '../ContentBlock';

// Styles
import importedStyles from './Header.module.less';
const styles: Styles = importedStyles;

type Styles = {
	self?: string;
	container?: string;
	sticky?: string;
};

type Props = {
	children?: React.ReactNode | React.ReactNode[];
	className?: string;
	sticky?: boolean;
};

const defaultProps: Partial<Props> = {
	sticky: false
};

/**
 * Header
 */
export const Header: React.FC<Props> = React.memo(({ children, sticky, className }) => {
	return (
		<ContentBlock className={ `${ styles.container } ${ sticky ? styles.sticky : '' } ${ className }` }>
			<header className={ styles.self }>
				{ children }
			</header>
		</ContentBlock>
	);
});

Header.defaultProps = defaultProps;
