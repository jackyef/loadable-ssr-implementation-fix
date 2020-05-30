import Scrollbar from 'react-scrollbars-custom';

import { MEDIA, mediaQueries, ContentBlock, styled, CSS } from '@tg/elm';

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

		background: ${ ({ theme }): CSS => theme.colors.white_100 } !important;
	}
`;

export const OuterWrapper = styled.div`
	/* stylelint-disable value-keyword-case */
	position: relative;

	${ ({ theme }): CSS => theme.shadows.deep };

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
				padding: ${ ({ theme }): CSS => `${ theme.space[3] } ${ theme.space[8] }` };
			}
		}
	}
`;
