import { Link } from 'react-router-dom';

import styled, { CSS } from '@prostpost/styled';
import { FormRoot } from '@prostpost/form';
import {
	flex,
	MEDIA,
	mediaQueries,
	Text,
	FieldInput
} from '@prostpost/elm';

export const StyledForm = styled(FormRoot)`
	/* stylelint-disable value-keyword-case */
	${ flex({
		dir: 'column',
		align: 'center'
	}) }

	width: 420px;
	padding: ${ ({ theme }): CSS => `${ theme.space[7] } ${ theme.space[7] } 0 ${ theme.space[7] }` };

	/* Text */
	${ mediaQueries[MEDIA.MOBILE] } {
		padding: ${ ({ theme }): CSS => theme.space[4] };
	}
`;

export const StyledInput = styled(FieldInput)`

	width: 100%;
	margin-bottom: ${ ({ theme }): CSS => theme.space[3] };

	> label {
		> div {
			${ flex({
				justify: 'space-between',
				align: 'center'
			}) }
		}

		> button {
			position: absolute;
			right: 0;
		}
	}
`;

export const StyledText = styled(Text)`
	${ flex({
		justify: 'center',
		align: 'center'
	}) }

	width: 100%;
	margin: ${ ({ theme }): CSS => `${ theme.space[3] } 0 0 ${ theme.space[2] }` };
`;

export const StyledLink = styled(Link)`
	color: ${ ({ theme }): CSS => theme.colors.blue_30 };
`;
