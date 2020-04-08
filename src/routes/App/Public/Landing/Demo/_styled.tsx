import styled from 'styled-components';
import Scrollbar from 'react-scrollbars-custom';

import { MEDIA, mediaQueries } from '@tg/elm';

import { ContentBlock } from 'app/components';

export const StyledImg = styled.img`
	width: 100%;
`;

export const StyledScrollbars = styled(Scrollbar)`
	width: 100%;
	height: 400px;

	> div {
		right: 0 !important;
	}
`;

export const StyledContentBlock = styled(ContentBlock)`
	${ mediaQueries[MEDIA.MOBILE] } {
		overflow: hidden;

		padding-right: 0;
		padding-left: 0;

		background: ${ ({ theme }) => theme.colors.white_100 } !important;
	}
`;

export const OutterWrapper = styled.div`
	/* stylelint-disable value-keyword-case */
	position: relative;

	${ ({ theme }) => theme.shadows.deep };

	${ mediaQueries[MEDIA.MOBILE] } {
		&::before {
			box-shadow: none !important;
		}
	}
`;

export const InnerWrapper = styled.div`
	> div {
		display: none;
	}

	${ mediaQueries[MEDIA.MOBILE] } {
		> img { display: none; }

		> div {
			display: block;
			height: 500px !important;
			> div:first-child { height: 504px; }

			img {
				width: auto;
				height: 500px;
				padding: ${ ({ theme }) => `${ theme.space[3] } ${ theme.space[8] }` };
			}
		}
	}
`;
