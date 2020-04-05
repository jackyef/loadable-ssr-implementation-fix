/**
 * @module Notification
 */
import React from 'react';

import { Button } from '@tg/elm';
import { PropsNotify } from '@tg/notify';
import { IconClose } from '@tg/resources';

// Styles
import importedStyles from './Notification.module.less';
const styles: Styles = importedStyles;

type Styles = {
	[key: string]: string;

	self?: string;
};

/**
 * Component
 */
export const Notification: React.FC<PropsNotify> = ({ state, text, onHide, name }) => (
	<div className={ `${ styles.self } ${ styles[state] }` }>
		{ text }
		<Button variant="inline" icon={ <IconClose /> } onClick={ () => onHide(name) } />
	</div>
);
