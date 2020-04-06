import styled from 'styled-components';

import { FormRoot } from '@tg/form';
import { Button, FieldInput, MEDIA, mediaQueries } from '@tg/elm';

export const StyledForm = styled(FormRoot)`
	display: flex;
	flex-direction: row;
	align-items: center;

	width: 100%;
	margin-top: ${ ({ theme }) => theme.spaces[32] };

	${ mediaQueries[MEDIA.MOBILE] } {
		flex-direction: column;
	}
`;

export const StyledInput = styled(FieldInput)`
	width: 420px;

	${ mediaQueries[MEDIA.TABLET] } {
		width: 310px;
	}

	${ mediaQueries[MEDIA.MOBILE] } {
		width: 100%;
		margin-bottom: ${ ({ theme }) => theme.spaces[8] };
	}
`;

export const StyledButton = styled(Button)`
	margin-left: ${ ({ theme }) => theme.spaces[24] };

	${ mediaQueries[MEDIA.TABLET] } {
		margin-left: ${ ({ theme }) => theme.spaces[18] };
	}

	${ mediaQueries[MEDIA.MOBILE] } {
		width: 100%;
		margin-left: 0;
	}
`;