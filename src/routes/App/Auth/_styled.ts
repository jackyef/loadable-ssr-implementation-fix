import styled, { CSS } from '@tg/styled';
import { flex, MEDIA, mediaQueries } from '@tg/elm';

import { NavItem } from 'app/components';

export const StyledMain = styled.main`
	/* stylelint-disable value-keyword-case */
	/* stylelint-disable value-no-vendor-prefix */

	${ flex({
		align: 'center',
		justify: 'center',
		width: '100vw'
	}) }

	background: ${ ({ theme }): CSS => theme.colors.white_100 };
`;

export const StyledVh = styled.div`

	${ flex({
		dir: 'column',
		justify: 'center'
	}) }

	height: 100vh;
	min-height: -webkit-fill-available;
`;

export const StyledNavItem = styled(NavItem)`

	${ flex({
		align: 'center'
	}) }

	/* Text */
	${ mediaQueries[MEDIA.MOBILE] } {
		> span {
			display: none;
		}
	}
`;
