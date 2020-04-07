import styled from 'styled-components';

import { Logo, MEDIA, mediaQueries } from '@tg/elm';

export const StyledContent = styled.div`
	display: flex;
	justify-content: space-between;
	align-items: center;

	padding-top: ${ ({ theme }) => theme.space[6] };

	border-top: 1px solid ${ ({ theme }) => theme.colors.blue_20 };

	${ mediaQueries[MEDIA.DESKTOP_NARROW] } {
		padding-top: ${ ({ theme }) => theme.space[6] };
		padding-bottom: ${ ({ theme }) => theme.space[2] };
	}

	${ mediaQueries[MEDIA.NOT_DESKTOP] } {
		padding-top: ${ ({ theme }) => theme.space[5] };
	}

	${ mediaQueries[MEDIA.MOBILE] } {
		flex-direction: column;
		align-items: flex-start;
	}
`;

export const StyledNav = styled.div`
	display: flex;
	justify-content: space-between;
	align-items: center;

	> a {
		margin-left: ${ ({ theme }) => theme.space[4] };
	}

	${ mediaQueries[MEDIA.MOBILE] } {
		flex-direction: column;
		align-items: flex-start;

		> a {
			padding: ${ ({ theme }) => theme.space[2] } 0;
			margin-left: 0;
		}
	}
`;

export const StyledLogo = styled(Logo)`
	margin: 0;
	opacity: .15;

	${ mediaQueries[MEDIA.MOBILE] } {
		margin-bottom: ${ ({ theme }) => theme.space[3] };
	}
`;
