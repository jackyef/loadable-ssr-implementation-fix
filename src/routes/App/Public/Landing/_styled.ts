import styled, { css } from 'styled-components';

import { Logo, MEDIA, mediaQueries } from '@tg/elm';

import { Nav, ContentBlock } from 'app/components';
import { Props as ContentBlockProps } from 'app/components/ContentBlock';

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

type ShadowProps = ContentBlockProps & {
	cover?: boolean;
};

export const Shadow = styled(ContentBlock)<ShadowProps>`
	/* stylelint-disable value-keyword-case */

	position: sticky;
	top: 55px;
	z-index: 1;

	padding: 5px 0 !important;

	background: ${ ({ theme }) => theme.colors.white_100 };

	${ ({ cover }) => cover
		? css`
			margin-top: -5px;
		`
		: css`
			${ ({ theme }) => theme.shadows.small }
		`
	}

	${ mediaQueries[MEDIA.MOBILE] } {
		display: none;
	}
`;

Shadow.defaultProps = {
	cover: false
};
