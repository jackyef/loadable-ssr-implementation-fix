import styled, { CSS } from '@tg/styled';
import { flex, mediaQueries, MEDIA } from '@tg/elm';

export const StyledList = styled.ul`
	/* stylelint-disable value-keyword-case */

	${ flex({
		justify: 'space-between',
		width: '100%'
	}) }

	max-width: 1100px;
	margin-top: ${ ({ theme }): CSS => theme.space[9] };

	${ mediaQueries[MEDIA.TABLET] } {
		flex-wrap: wrap;
		justify-content: center;

		> li:last-child {
			width: 100%;
			max-width: 590px;
			height: 420px;
		}
	}

	@media screen and (max-width: 763px) {
		${ flex({
			dir: 'column',
			wrap: false,
			align: 'center',
			justify: 'flex-start'
		}) }

		> li:last-child {
			width: 290px;
			height: 480px;
		}
	}
`;
