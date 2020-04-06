import styled from 'styled-components';

import { mediaQueries, MEDIA, Heading, Paragraph } from '@tg/elm';

const MEDIA_CUSTOM = '@media screen and (max-width: 1200px)';

export const StyledContent = styled.div`
	display: flex;
	flex-direction: column;

	padding: ${ ({ theme }) => theme.spaces[48] } 0 250px 0;

	${ mediaQueries[MEDIA.TABLET] } {
		padding-bottom: 200px;
	}

	${ mediaQueries[MEDIA.MOBILE] } {
		padding-bottom: 220px;
	}
`;

export const StyledTop = styled.div`
	display: flex;
	justify-content: space-between;

	/* Need custom width here */
	${ MEDIA_CUSTOM } {
		flex-direction: column;
	}
`;

export const StyledHeading = styled(Heading)`
	width: 633px;

	/* Need custom width here */
	${ MEDIA_CUSTOM } {
		width: 100%;
		max-width: 600px;
	}
`;

export const StyledParagraph = styled(Paragraph)`
	width: 311px;
	margin-top: ${ ({ theme }) => theme.spaces[12] };

	/* Need custom width here */
	${ MEDIA_CUSTOM } {
		width: 100%;
		max-width: 600px;
	}
`;
