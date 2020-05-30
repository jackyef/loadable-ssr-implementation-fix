/**
 * Navigation item container
 */
import React from 'react';
import styled from 'styled-components';

type Props = {
	className?: string;
	children?: React.ReactNode | React.ReactNode[];
};

const defaultProps: Partial<Props> = {
	className: ''
};

const StyledItem = styled.li`
	margin: 0 10px;
	&:last-child { margin-right: 0; }
	&:first-child { margin-left: 0; }
`;

/**
 * Nav item
 */
export const NavItem: React.FC<Props> = React.memo(({ children, className }) => (
	<StyledItem className={ className }>
		{ children }
	</StyledItem>
));

NavItem.defaultProps = defaultProps;
NavItem.displayName = 'NavItem';
