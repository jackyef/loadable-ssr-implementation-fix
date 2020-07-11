/**
 * Subscribe/login mini form with input field & one button
 *
 * @module GetStarted
 */
import _ from 'lodash';
import React from 'react';

import { FieldInput, validators } from '@prostpost/elm';
import { StoreForm, StoreFormAPI } from '@prostpost/form';
import { IconArrowReverse } from '@prostpost/resources';

import { StyledButton, StyledInputContainer, StyledForm } from './_styled';

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
	<StyledForm inject={ storeForm } className={ className }>

		{/* Email */}
		<StyledInputContainer>
			<FieldInput size="big" name="email" detail="rounded"
				placeholder="Your email address"
				validators={ [validators.email.optional] }
			/>
		</StyledInputContainer>

		{/* Validate email and redirect to sign up */}
		<StyledButton size="big" iconPos="right" detail="rounded"
			title="Get started"
			icon={ <IconArrowReverse /> }
			onClick={ () => {
				const { valid } = storeForm.validate();
				if (valid) {
					onClick(storeForm.getFieldValue<string>('email'));
				}
			} }
		/>
	</StyledForm>
);

GetStarted.defaultProps = defaultProps;
