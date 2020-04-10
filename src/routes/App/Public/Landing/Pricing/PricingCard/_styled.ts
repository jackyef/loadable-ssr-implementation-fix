import styled from 'styled-components';

import { flex, MEDIA, mediaQueries } from '@tg/elm';

import { Props } from './';

export const StyledContainer = styled.li<Props>`
	/* stylelint-disable value-keyword-case */

	${ flex({
		dir: 'column',
		justify: 'space-between',
		align: 'center'
	}) }

	max-width: 380px;
	padding: ${ ({ theme }) => `${ theme.space[6] } ${ theme.space[7] }` };
	margin: 0 ${ ({ theme }) => theme.space[3] };

	background: ${ ({ theme, variant }) => variant === 'dark' ? theme.colors.blue_100 : theme.colors.white_100 };
	border-radius: ${ ({ theme }) => theme.radii.mid };

	${ mediaQueries[MEDIA.NOT_DESKTOP] } {
		max-width: 420px;
		margin-bottom: ${ ({ theme }) => theme.space[7] };
	}
`;

export const StyledHeader = styled.header<Props>`
	/* stylelint-disable declaration-colon-newline-after */

	position: relative;

	width: 100%;
	padding: ${ ({ theme }) => `${ theme.space[5] } 0` };

	border-bottom: 1px solid ${ ({ theme, variant }) => (
		variant === 'dark' ? theme.colors.blue_20_opaque : theme.colors.blue_20
	) };
`;

export const StyledFeaturesList = styled.ul`
	width: 100%;
	margin-top: 30px;
`;

export const StyledFeature = styled.li`

	${ flex({
		align: 'center'
	}) }

	padding: ${ ({ theme }) => theme.space[1] };
`;

export const StyledBetaContainer = styled.div`

	${ flex({
		dir: 'column',
		align: 'center'
	}) }

	position: absolute;
	top: -60px;
	right: -18px;
`;

export const StyledBetaIcon = styled.span`

	${ flex({
		justify: 'center',
		align: 'center'
	}) }

	width: 64px;
	height: 64px;

	background: ${ ({ theme }) => theme.colors.blue_100 };
	border-radius: 32px;
`;
