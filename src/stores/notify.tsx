/**
 * Notifications store
 */
import _ from 'lodash';
import React from 'react';

import styled, { CSS } from '@tg/styled';
import { flex, Notification } from '@tg/elm';
import { StoreFormInterface } from '@tg/form';
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
	height: ${ ({ theme }): CSS => theme.space[8] };
	margin-top: ${ ({ theme }): CSS => theme.space[5] };
`;

export const FormNotifyBox: React.FC = () => (
	<StyledNotifyBox keepBox
		store={ notifyFormStore }
		notification={ Notification }
	/>
);

export type Errors = {
	errors: Array<{
		[key: string]: string
	}>
};

// Awake error notification (form notification)
export const awakeFormNotify = (err: Errors, store: StoreFormInterface): void => {

	// Get errors from response with a default error message
	const errors = _.get(err, 'errors');

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
	let parsedErrors = null;
	if (errors && !fieldErrors && !_.get(errors, 'schema.0')) {
		parsedErrors = { schema: [_.get(errors, '0.detail', 'Unknown server error')] };
	}

	// Schema level errors (notification)
	if (parsedErrors?.schema) {
		notifyFormStore.awake({
			text: _.get(errors, 'schema.0', 'Unknown server error'),
			state: 'error'
		});
	}
};
