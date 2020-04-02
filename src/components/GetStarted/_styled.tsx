import styled from 'styled-components';

import { FormRoot } from '@tg/form';
import { Button, NewFieldInput } from '@tg/elm';

export const StyledForm = styled(FormRoot)`
	display: flex;
	flex-direction: row;
	align-items: center;

	width: 100%;
	margin-top: ${ ({ theme }) => theme.spaces[32] };
`;

export const StyledInput = styled(NewFieldInput)`
	width: 420px;
`;

export const StyledButton = styled(Button)`
	margin-left: ${ ({ theme }) => theme.spaces[24] };
`;
