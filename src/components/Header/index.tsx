/**
 * Header
 * Main page top header
 * with Logo/Navigation etc.
 */
import React from 'react';

import { StyledContainer, StyledHeader } from './_styled';

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
export const Header: React.FC<Props> = React.memo(({ children, sticky, className }) => (
	<StyledContainer sticky={ sticky } className={ className }>
		<StyledHeader>
			{ children }
		</StyledHeader>
	</StyledContainer>
));

Header.defaultProps = defaultProps;
