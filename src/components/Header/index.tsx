/**
 * Header
 * Main page top header
 * with Logo/Navigation etc.
 */
import React from 'react';

import { Theme } from '@tg/styled';

import { StyledContainer, StyledHeader, Shadow } from './_styled';

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
	<>
		<StyledContainer { ...props } y={ '0' }>
			<StyledHeader>
				{ children }
			</StyledHeader>
		</StyledContainer>

		{/* Hack to hide header shadow when page has not been scrolled down yet */}
		{
			!props.sticky ? null : (<>
				<Shadow>{}</Shadow>
				<Shadow cover>{}</Shadow>
			</>)
		}
	</>
));

Header.defaultProps = defaultProps;
Header.displayName = 'Header';
