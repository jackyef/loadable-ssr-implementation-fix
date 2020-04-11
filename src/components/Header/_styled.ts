import styled, { css } from 'styled-components';

import { MEDIA, mediaQueries, flex } from '@tg/elm';

import { ContentBlock, Props as ContentBlockProps } from 'app/components/ContentBlock';
import { Props } from '.';

export const StyledContainer = styled(ContentBlock)<Props>`
	/* stylelint-disable value-keyword-case */

	${ flex({
		justify: 'center'
	}) }

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

	width: 100%;
	max-width: 1366px;
	padding: ${ ({ theme }) => `29px 0 ${ theme.space[3] } 0` };

	${ mediaQueries[MEDIA.NOT_DESKTOP] } {
		padding: 0;
	}
`;

type ShadowProps = ContentBlockProps & {
	cover?: boolean;
};

export const Shadow = styled(ContentBlock)<ShadowProps>`

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
