import styled, { css } from 'styled-components';

import { MEDIA, mediaQueries } from '@tg/elm';

import { ContentBlock } from '../ContentBlock';
import { Props } from '.';

export const StyledContainer = styled(ContentBlock)<Props>`
	/* stylelint-disable value-keyword-case */

	${ ({ sticky }) => !sticky ? '' : css`
		${ mediaQueries[MEDIA.DESKTOP] } {
			position: sticky;
			top: ${ ({ theme }) => `-${ theme.spaces[16] }` };
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
	padding: ${ ({ theme }) => `29px 0 ${ theme.spaces[12] } 0` };

	${ mediaQueries[MEDIA.TABLET] } {
		padding: ${ ({ theme }) => `${ theme.spaces[16] } 0 ${ theme.spaces[12] } 0` };
	}
`;
