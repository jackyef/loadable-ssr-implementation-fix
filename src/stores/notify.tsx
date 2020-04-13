/**
 * Notifications store
 */
import _ from 'lodash';
import React from 'react';
import styled from 'styled-components';

import { flex, Notification } from '@tg/elm';
import { IStoreForm } from '@tg/form';
import { StoreNotify, NotifyBox as BaseNotifyBox } from '@tg/notify';

export const notifyStore = new StoreNotify();
export const notifyFormStore = new StoreNotify();

const StyledNotifyBox = styled(BaseNotifyBox)`
	/* stylelint-disable value-keyword-case */

	${ flex({
		justify: 'center'
	}) }

	position: relative;

	width: 100%;
	height: ${ ({ theme }) => theme.space[8] };
	margin-top: ${ ({ theme }) => theme.space[5] };
`;

/**
 * Component
 */
export const FormNotifyBox: React.FC<{}> = () => (
	<StyledNotifyBox keepBox
		store={ notifyFormStore }
		notification={ Notification }
	/>
);

// Awake error notification (form notification)
export const awakeFormNotify = (err: any, store: IStoreForm): void => {

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
		notifyFormStore.awake({
			name: 'signInError',
			text: _.get(errors, 'schema.0', 'Unknown server error'),
			state: 'error',
			delay: 10000
		});
	}
};
