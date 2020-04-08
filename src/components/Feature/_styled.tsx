import styled from 'styled-components';

import { flex } from '@tg/elm';

export const StyledContainer = styled.li`
	/* stylelint-disable value-keyword-case */

	${ flex({
		dir: 'column',
		align: 'center',
		width: '30%'
	}) }

	max-width: 340px;
	margin: 0 10px;
`;
