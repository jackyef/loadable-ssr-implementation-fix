import styled from 'styled-components';

import { Logo, MEDIA, mediaQueries } from '@tg/elm';

export const StyledContent = styled.div`
	display: flex;
	justify-content: space-between;
	align-items: center;

	padding-top: ${ ({ theme }) => theme.spaces[32] };

	border-top: 1px solid ${ ({ theme }) => theme.colors.blue_20 };

	${ mediaQueries[MEDIA.DESKTOP_NARROW] } {
		padding-top: ${ ({ theme }) => theme.spaces[32] };
		padding-bottom: ${ ({ theme }) => theme.spaces[8] };
	}

	${ mediaQueries[MEDIA.NOT_DESKTOP] } {
		padding-top: ${ ({ theme }) => theme.spaces[20] };
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
		margin-left: ${ ({ theme }) => theme.spaces[16] };
	}

	${ mediaQueries[MEDIA.MOBILE] } {
		flex-direction: column;
		align-items: flex-start;

		> a {
			padding: ${ ({ theme }) => theme.spaces[8] } 0;
			margin-left: 0;
		}
	}
`;

export const StyledLogo = styled(Logo)`
	margin: 0;
	opacity: .15;

	${ mediaQueries[MEDIA.MOBILE] } {
		margin-bottom: ${ ({ theme }) => theme.spaces[12] };
	}
`;
