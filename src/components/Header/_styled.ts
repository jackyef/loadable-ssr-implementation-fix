import styled, { css } from 'styled-components';

import { MEDIA, mediaQueries } from '@tg/elm';

import { ContentBlock } from '../ContentBlock';

type Props = {
	sticky?: boolean;
};

export const StyledContainer = styled(ContentBlock)<Props>`
	padding: 0 150px;

	background: ${ ({ theme }) => theme.colors.white_100 };

	${ mediaQueries[MEDIA.DESKTOP_NARROW] } { padding: 0 75px; }
	${ mediaQueries[MEDIA.TABLET] } { padding: 0 20px; }
	${ mediaQueries[MEDIA.MOBILE] } { padding: 0 16px; }

	${ ({ sticky }) => !sticky ? '' : css`
		${ mediaQueries[MEDIA.DESKTOP] } {
			position: sticky;
			top: -18px;
			z-index: 2;
		}

		${ mediaQueries[MEDIA.NOT_DESKTOP] } {
			position: relative;
			top: 0;
		}
	` }
`;

export const StyledHeader = styled.header`
	display: flex;
	justify-content: space-between;
	align-items: center;

	max-width: 1366px;
	padding: 30px 0 10px 0;

	background: ${ ({ theme }) => theme.colors.white_100 };

	${ mediaQueries[MEDIA.TABLET] } {
		padding: 16px 0 10px 0;
	}
`;
