/**
 * Subscribe/login mini form with input field & one button
 * @module GetStarted
 */
import _ from 'lodash';
import React from 'react';

import { Btn, NewFieldInput } from '@tg/elm';
import { FormRoot, StoreForm, StoreFormAPI } from '@tg/form';
import { validators } from '@tg/app';
import { IconArrowReverse } from '@tg/resources';

import importedStyles from './GetStarted.module.less';
const styles: Styles = importedStyles;

type Styles = {
	self?: string;
};

type Props = {

	/**
	 * Redirect to sign up
	 */
	onClick?: (email?: string) => void;

	/**
	 * Custom user styles
	 */
	className?: string;
};

/**
 * Form
 */
const storeFormAPI = new StoreFormAPI();
const storeForm = new StoreForm('formGetStarted', {}, storeFormAPI);

const defaultProps: Partial<Props> = {
	onClick: _.noop,
	className: ''
};

export const GetStarted: React.FC<Props> = ({ onClick, className }) => (
	<FormRoot wrapper="form" inject={ storeForm } className={ `${ styles.self } ${ className }` }>

		{/* Email */}
		<NewFieldInput name="email" size="big" detail="rounded"
			placeholder="Your email address"
			validators={ [validators.email.optional] }
		/>

		{/* Validate email and redirect to sign up */}
		<Btn title="Get started"
			icon={ <IconArrowReverse /> } iconPos="right"
			kind={ { variant: 'general', size: 'big', detail: 'rounded' } }
			onClick={ () => {

				// Validate email
				const { valid } = storeForm.validate();

				// Proceed if valid
				if (valid) {
					onClick(storeForm.getFieldValue('email'));
				}
			} }
		/>
	</FormRoot>
);

GetStarted.defaultProps = defaultProps;
