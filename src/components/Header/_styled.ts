import styled, { css, CSS } from '@tg/styled';
import {
	MEDIA,
	mediaQueries,
	flex,
	ContentBlock,
	ContentBlockProps
} from '@tg/elm';

import { Props } from '.';

export const StyledContainer = styled(ContentBlock)<Props>`
	/* stylelint-disable value-keyword-case */

	${ flex({
		justify: 'center'
	}) }

	${ ({ sticky }): CSS => !sticky ? '' : css`
		${ mediaQueries[MEDIA.DESKTOP] } {
			position: sticky;
			top: ${ ({ theme }): CSS => `-${ theme.space[4] }` };
			z-index: 2;
		}

		${ mediaQueries[MEDIA.NOT_DESKTOP] } {
			position: relative;
			top: 0;

			padding-top: ${ ({ theme }): CSS => theme.space[6] };
			padding-bottom: ${ ({ theme }): CSS => theme.space[6] };
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
	padding: ${ ({ theme }): CSS => `29px 0 ${ theme.space[3] } 0` };

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

	background: ${ ({ theme }): CSS => theme.colors.white_100 };

	${ ({ cover }): CSS => cover
		? css`
			margin-top: -5px;
		`
		: css`
			${ ({ theme }): CSS => theme.shadows.small }
		`
	}

	${ mediaQueries[MEDIA.MOBILE] } {
		display: none;
	}
`;

Shadow.defaultProps = {
	cover: false
};
