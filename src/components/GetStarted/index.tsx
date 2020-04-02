/**
 * Subscribe/login mini form with input field & one button
 * @module GetStarted
 */
import _ from 'lodash';
import React from 'react';

import { validators } from '@tg/app';
import { StoreForm, StoreFormAPI } from '@tg/form';
import { IconArrowReverse } from '@tg/resources';

import { StyledButton, StyledInput, StyledForm } from './_styled';

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
	<StyledForm wrapper="form" inject={ storeForm } className={ className }>

		{/* Email */}
		<StyledInput size="big" name="email" detail="rounded"
			placeholder="Your email address"
			validators={ [validators.email.optional] }
		/>

		{/* Validate email and redirect to sign up */}
		<StyledButton size="big" iconPos="right" detail="rounded"
			title="Get started"
			icon={ <IconArrowReverse /> }
			onClick={ () => {

				// Validate email
				const { valid } = storeForm.validate();

				// Proceed if valid
				if (valid) {
					onClick(storeForm.getFieldValue('email'));
				}
			} }
		/>
	</StyledForm>
);

GetStarted.defaultProps = defaultProps;
