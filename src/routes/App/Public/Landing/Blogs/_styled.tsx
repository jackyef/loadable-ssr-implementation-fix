import { Heading, MEDIA, mediaQueries, flex, styled, CSS } from '@tg/elm';

export const StyledHeading = styled(Heading)`
	width: 440px;
	margin-bottom: ${ ({ theme }): CSS => theme.space[10] };

	text-align: center;

	${ mediaQueries[MEDIA.MOBILE] } {
		width: 100%;
		max-width: 440px;
		margin: ${ ({ theme }): CSS => `${ theme.space[10] } 0 ${ theme.space[7] } 0` };
	}
`;

export const StyledList = styled.ul`
	/* stylelint-disable value-keyword-case */

	${ flex({
		align: 'flex-start',
		justify: 'space-between'
	}) }

	${ mediaQueries[MEDIA.TABLET] } {
		flex-wrap: wrap;
		justify-content: center;

		max-width: 600px;

		> li:first-child {
			width: calc(50% - ${ ({ theme }): CSS => theme.space[6] });
			margin: 0 ${ ({ theme }): CSS => theme.space[6] } 0 0;
		}

		> li:nth-child(2) {
			width: calc(50% - ${ ({ theme }): CSS => theme.space[6] });
			margin: 0 0 0 ${ ({ theme }): CSS => theme.space[6] };
		}

		> li:last-child {
			width: 100%;
			margin: ${ ({ theme }): CSS => theme.space[7] } 0 0 0;
		}
	}

	${ mediaQueries[MEDIA.MOBILE] } {
		flex-direction: column;
		flex-wrap: nowrap;
		align-items: center;

		width: 100%;

		> li { width: 100%; }
		> li:not(:last-child) { margin: 0 0 ${ ({ theme }): CSS => theme.space[7] } 0; }
	}
`;
