/**
 * @module Notification
 */
import React from 'react';

import { Btn } from '@tg/kit-elm';
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
		<Btn icon={ <IconClose /> } onClick={ () => onHide(name) } />
	</div>
);
