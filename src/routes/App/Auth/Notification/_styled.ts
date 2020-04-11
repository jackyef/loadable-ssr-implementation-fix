import styled, { css, keyframes } from 'styled-components';

import { flex, Button, Text } from '@tg/elm';
import { NotifyBox, PropsNotify } from '@tg/notify';

export const StyledNotifyBox = styled(NotifyBox)`
	/* stylelint-disable value-keyword-case */

	${ flex({
		justify: 'center'
	}) }

	position: relative;

	width: 100%;
	height: ${ ({ theme }) => theme.space[8] };
	margin-top: ${ ({ theme }) => theme.space[5] };
`;

export const StyledCloseButton = styled(Button)`
	position: absolute;
	right: ${ ({ theme }) => theme.space[2] };
`;

export const StyledMessage = styled(Text)`
	max-width: 80%;
`;

const animation = keyframes`
	0% {
		opacity: 0;
		transform: translateY(15px);
	}
	100% {
		opacity: 1;
		transform: translateY(0);
	}
`;

export const StyledContainer = styled.div<{ state: PropsNotify['state'] }>`

	${ flex({
		align: 'center'
	}) }

	position: relative;

	width: 100%;
	height: 100%;
	padding: ${ ({ theme }) => `${ theme.space[6] } ${ theme.space[5] }` };

	border-radius: ${ ({ theme }) => theme.radii.small };

	animation-name: ${ animation };
	animation-duration: 500ms;
	animation-fill-mode: forwards;

	${ ({ state }) => state === 'error'
		? css`background: ${ ({ theme }) => theme.colors.red_100 };`
		: css`background: ${ ({ theme }) => theme.colors.green_100 };`
	}
`;
