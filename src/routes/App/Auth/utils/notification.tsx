import _ from 'lodash';
import React from 'react';

import { IStoreForm } from '@tg/form';
import { StoreNotify, NotifyBox as UINotifyBox } from '@tg/notify';

import { Notification } from '../Notification';

// Styles
// eslint-disable-next-line import/no-internal-modules
import importedStyles from '../Notification/Notification.module.less';
const styles: Styles = importedStyles;

type Styles = {
	notify_box?: string;
};

// Local notifications store (for form level errors)
export const notifyStore = new StoreNotify();

// Awake error notification
export const awakeNotification = (err: any, store: IStoreForm): void => {

	// Get errors from response with a default error message
	let errors = _.get(err, 'errors');

	// Form fields
	const fields = [
		'email',
		'password',
		'repeat_password'
	];

	// Fields errors
	let fieldErrors = false;
	for (const fieldName of fields) {
		const fieldError = _.get(errors, `${ fieldName }.0`);
		if (fieldError) {
			fieldErrors = true;
			store.injectErrors({ [fieldName]: fieldError });
		}
	}

	// Default error if server respond with general (not schema) format
	if (errors && !fieldErrors && !_.get(errors, 'schema.0')) {
		errors = { schema: [_.get(errors, '0.detail', 'Unknown server error')] };
	}

	// Schema level errors (notification)
	if (errors.schema) {
		notifyStore.awake({
			name: 'signInError',
			text: _.get(errors, 'schema.0', 'Unknown server error'),
			state: 'error',
			delay: 10000
		});
	}
};

/**
 * Component
 */
export const NotifyBox: React.FC<{}> = () => (
	<UINotifyBox keepBox store={ notifyStore } className={ styles.notify_box }
		notification={ Notification }
	/>
);
