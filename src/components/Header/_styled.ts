import styled, { css } from 'styled-components';

import { MEDIA, mediaQueries, flex } from '@tg/elm';

import { ContentBlock } from 'app/components/ContentBlock';
import { Props } from '.';

export const StyledContainer = styled(ContentBlock)<Props>`
	/* stylelint-disable value-keyword-case */

	${ ({ sticky }) => !sticky ? '' : css`
		${ mediaQueries[MEDIA.DESKTOP] } {
			position: sticky;
			top: ${ ({ theme }) => `-${ theme.space[4] }` };
			z-index: 2;
		}

		${ mediaQueries[MEDIA.NOT_DESKTOP] } {
			position: relative;
			top: 0;

			padding-top: ${ ({ theme }) => theme.space[6] };
			padding-bottom: ${ ({ theme }) => theme.space[6] };
		}
	` }
`;

export const StyledHeader = styled.header`

	${ flex({
		justify: 'space-between',
		align: 'center'
	}) }

	max-width: 1366px;
	padding: ${ ({ theme }) => `29px 0 ${ theme.space[3] } 0` };

	${ mediaQueries[MEDIA.NOT_DESKTOP] } {
		padding: 0;
	}
`;
