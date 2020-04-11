import styled from 'styled-components';

import { Logo, MEDIA, mediaQueries } from '@tg/elm';

import { Nav } from 'app/components';

import { Demo } from './Demo';

export const StyledLogo = styled(Logo)`
	margin-top: ${ ({ theme }) => `-${ theme.space[3] }` };

	${ mediaQueries[MEDIA.DESKTOP] } {
		margin-left: ${ ({ theme }) => `-${ theme.space[6] }` };
	}
`;

export const StyledNav = styled(Nav)`
	margin-right: auto;
	margin-left: 80px;

	${ mediaQueries[MEDIA.NOT_DESKTOP] } {
		display: none;
	}
`;

export const StyledNavSign = styled(Nav)`
	${ mediaQueries[MEDIA.MOBILE] } {
		> ul > li:last-child { display: none; }
		> ul > li:first-child { margin-right: 0; }
	}
`;

export const StyledDemo = styled(Demo)`
	margin-top: -275px;

	${ mediaQueries[MEDIA.TABLET] } {
		margin-top: -115px;
	}

	${ mediaQueries[MEDIA.MOBILE] } {
		padding: 0;
		margin-top: -190px;
	}
`;
