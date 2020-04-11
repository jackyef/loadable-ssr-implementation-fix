/**
 * @module Notification
 */
import React from 'react';

import { PropsNotify } from '@tg/notify';
import { IconClose } from '@tg/resources';

import {
	StyledCloseButton,
	StyledContainer,
	StyledMessage
} from './_styled';

/**
 * Component
 */
export const Notification: React.FC<PropsNotify> = ({ state, text, onHide, name }) => (
	<StyledContainer state={ state }>
		<StyledMessage size={ 13 } color="white_100">
			{ text }
		</StyledMessage>
		<StyledCloseButton variant="inline"
			color="white_100"
			icon={ <IconClose /> }
			onClick={ () => onHide(name) }
		/>
	</StyledContainer>
);
