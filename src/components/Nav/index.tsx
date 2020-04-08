/**
 * Main navigation (top level)
 */
import React from 'react';
import styled from 'styled-components';

import { flex } from '@tg/elm';

type Props = {
	children?: React.ReactNode | React.ReactNode[];
	className?: string;
};

const defaultProps: Partial<Props> = {
	className: ''
};

const StyledNav = styled.ul`
	/* stylelint-disable value-keyword-case */

	${ flex({
		align: 'center'
	}) }
`;

/**
 * Nav
 */
export const Nav: React.FC<Props> = React.memo(({ children, className }) => (
	<nav className={ className }>
		<StyledNav>
			{ children }
		</StyledNav>
	</nav>
));

Nav.defaultProps = defaultProps;
