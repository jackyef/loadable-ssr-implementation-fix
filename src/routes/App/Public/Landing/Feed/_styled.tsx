import {
	MEDIA,
	mediaQueries,
	flex,
	Heading,
	ContentBlock,
	styled,
	CSS
} from '@tg/elm';

export const StyledContentBlock = styled(ContentBlock)`
	/* stylelint-disable value-keyword-case */

	@media screen and (max-width: 879px) and (min-width: 640px) {
		padding-bottom: 0;
	}

	@media screen and (max-width: 1023px) and (min-width: 640px) {
		padding-top: 0;
	}
`;

export const StyledWrapper = styled.div`

	${ flex({
		align: 'center',
		justify: 'space-between',
		width: '100%'
	}) }

	padding-top: ${ ({ theme }): CSS => theme.space[9] };

	${ mediaQueries[MEDIA.TABLET] } {
		justify-content: center;
	}

	${ mediaQueries[MEDIA.MOBILE] } {
		flex-direction: column;
		padding-top: 0;
	}

	@media screen and (max-width: 1099px) and (min-width: 640px) {
		padding-top: 0;
	}
`;

export const StyledHeading = styled(Heading)`
	min-width: 280px;
	margin-bottom: 45px;

	${ mediaQueries[MEDIA.MOBILE] } {
		width: 100%;
	}
`;
