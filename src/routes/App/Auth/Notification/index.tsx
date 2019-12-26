/**
 * @module Notification
 */
import React from 'react';

import { Btn } from '@scc/elm';
import { PropsNotify } from '@scc/notify';

import { IconClose } from '@tg/ui/dist/resources';

// Styles
import importedStyles from './Notification.module.less';
const styles: Styles = importedStyles;

type Styles = {
	self?: string;

	// States
	[key: string]: string;
};

/**
 * Component
 */
export const Notification: React.FC<PropsNotify> = ({ state, text, onHide, name }) => (
	<div className={`${ styles.self } ${ styles[state] }`}>
		{ text }
		<Btn icon={<IconClose />} onClick={ () => onHide(name) } />
	</div>
);