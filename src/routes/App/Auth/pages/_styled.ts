import styled from 'styled-components';
import { Link } from 'react-router-dom';

import { flex, MEDIA, mediaQueries, Text, FieldInput } from '@tg/elm';
import { FormRoot } from '@tg/form';

export const StyledForm = styled(FormRoot)`
	/* stylelint-disable value-keyword-case */
	${ flex({
		dir: 'column',
		align: 'center'
	}) }

	width: 420px;
	padding: ${ ({ theme }) => `${ theme.space[7] } ${ theme.space[7] } 0 ${ theme.space[7] }` };

	/* Text */
	${ mediaQueries[MEDIA.MOBILE] } {
		padding: ${ ({ theme }) => theme.space[4] };
	}
`;

export const StyledInput = styled(FieldInput)`

	width: 100%;
	margin-bottom: ${ ({ theme }) => theme.space[3] };

	> label {
		> div {
			${ flex({
				justify: 'space-between',
				align: 'center'
			}) }
		}
	}
`;

export const StyledText = styled(Text)`
	${ flex({
		justify: 'center',
		align: 'center'
	}) }

	width: 100%;
	margin: ${ ({ theme }) => `${ theme.space[3] } 0 0 ${ theme.space[2] }` };
`;

export const StyledLink = styled(Link)`
	color: ${ ({ theme }) => theme.colors.blue_30 };
`;
