import _ from 'lodash';
import React from 'react';
import { StoreNotify, NotifyBox as UINotifyBox } from '@scc/notify';

import { Notification } from '../Notification';

// Styles
import importedStyles from '../Notification/Notification.module.less';
const styles: Styles = importedStyles;

type Styles = {
	notify_box?: string;
};

// Local notifications store (for form level errors)
export const notifyStore = new StoreNotify();

// Awake error notification
export const awakeNotification = (err: any) => {
	notifyStore.awake({
		name: 'signInError',
		text: _.get(err, 'errors.0.detail', 'Unknown server error'),
		state: 'error',
		delay: 10000
	});
};

/**
 * Component
 */
export const NotifyBox = () => (
	<UINotifyBox keepBox store={ notifyStore } className={ styles.notify_box }
		notification={ Notification }
	/>
);
