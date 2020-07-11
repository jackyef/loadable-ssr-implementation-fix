import {
	Logo,
	MEDIA,
	mediaQueries,
	flex
} from '@prostpost/elm';
import styled, { CSS } from '@prostpost/styled';

export const StyledContent = styled.div`
	/* stylelint-disable value-keyword-case */

	${ flex({
		justify: 'space-between',
		align: 'center'
	}) }

	padding-top: ${ ({ theme }): CSS => theme.space[6] };

	border-top: 1px solid ${ ({ theme }): CSS => theme.colors.blue_20 };

	${ mediaQueries[MEDIA.DESKTOP_NARROW] } {
		padding-top: ${ ({ theme }): CSS => theme.space[6] };
		padding-bottom: ${ ({ theme }): CSS => theme.space[2] };
	}

	${ mediaQueries[MEDIA.NOT_DESKTOP] } {
		padding-top: ${ ({ theme }): CSS => theme.space[5] };
	}

	${ mediaQueries[MEDIA.MOBILE] } {
		flex-direction: column;
		align-items: flex-start;
	}
`;

export const StyledNav = styled.div`

	${ flex({
		justify: 'space-between',
		align: 'center'
	}) }

	> a {
		margin-left: ${ ({ theme }): CSS => theme.space[4] };
	}

	${ mediaQueries[MEDIA.MOBILE] } {
		flex-direction: column;
		align-items: flex-start;

		> a {
			padding: ${ ({ theme }): CSS => theme.space[2] } 0;
			margin-left: 0;
		}
	}
`;

export const StyledLogo = styled(Logo)`
	margin: 0;
	opacity: .15;

	${ mediaQueries[MEDIA.MOBILE] } {
		margin-bottom: ${ ({ theme }): CSS => theme.space[3] };
	}
`;
