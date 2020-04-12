import styled from 'styled-components';

import { FormRoot } from '@tg/form';
import { Button, MEDIA, mediaQueries, flex } from '@tg/elm';

export const StyledForm = styled(FormRoot)`
	/* stylelint-disable value-keyword-case */

	${ flex({
		align: 'center',
		width: '100%'
	}) }

	margin-top: ${ ({ theme }) => theme.space[6] };

	${ mediaQueries[MEDIA.MOBILE] } {
		flex-direction: column;
	}
`;

export const StyledInputContainer = styled.div`
	width: 420px;

	${ mediaQueries[MEDIA.TABLET] } {
		width: 55%;
	}

	${ mediaQueries[MEDIA.MOBILE] } {
		width: 100%;
		margin-bottom: ${ ({ theme }) => theme.space[2] };
	}
`;

export const StyledButton = styled(Button)`
	margin-left: ${ ({ theme }) => theme.space[5] };

	${ mediaQueries[MEDIA.TABLET] } {
		margin-left: ${ ({ theme }) => theme.space[4] };
	}

	${ mediaQueries[MEDIA.MOBILE] } {
		width: 100%;
		margin-left: 0;
	}
`;
