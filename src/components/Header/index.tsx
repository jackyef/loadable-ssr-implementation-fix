/**
 * Header
 * Main page top header
 * with Logo/Navigation etc.
 */
import React from 'react';

import { Theme } from '@tg/elm';

import { StyledContainer, StyledHeader } from './_styled';

export type Props = {

	/**
	 * Header container content
	 */
	children?: React.ReactNode | React.ReactNode[];

	/**
	 * User styles
	 */
	className?: string;

	/**
	 * Make header sticky to page's top
	 */
	sticky?: boolean;

	/**
	 * Theme object
	 */
	theme?: Theme;
};

const defaultProps: Partial<Props> = {
	sticky: false
};

/**
 * Header
 */
export const Header: React.FC<Props> = React.memo(({ children, ...props }) => (
	<StyledContainer y={ '0' } { ...props } >
		<StyledHeader>
			{ children }
		</StyledHeader>
	</StyledContainer>
));

Header.defaultProps = defaultProps;
