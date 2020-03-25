/**
 * Authentication process the very first route (Sign in)
 */
import _ from 'lodash';
import React from 'react';
import { Helmet } from 'react-helmet';

import { FormRoot, StoreForm, StoreFormAPI } from '@tg/form';

import { Btn, Headline } from '@tg/elm';
import { FieldInput, validators } from '@tg/app';
import { service as authService } from '@tg/api-proxy-auth';

import { NotifyBox, awakeNotification, notifyStore } from './utils/notification';

// Styles
import { Styles } from './';
import importedStyles from './Auth.module.less';
const styles: Styles = importedStyles;

// Form store
const apiFormStore = new StoreFormAPI(authService.axiosInstance);
const formStore = new StoreForm('auth', null, apiFormStore);

/**
 * Reset user password
 */
const ResetPassword: React.FC<{}> = () => {
	return (
		<>
			<Helmet>
				<title>{ 'Reset password' }</title>
			</Helmet>

			{/* Reset password form */}
			<FormRoot wrapper="form" name="reset" inject={ formStore }
				styles={ styles.form }
				submitMethod="POST"
				submitURL={ authService.shot('user', 'reset_password').options.url }
				onSubmitFailed={ err => awakeNotification(err, formStore) }
				onSubmitSucceed={ data => {
					notifyStore.awake({
						name: 'resetPasswordPostSuccess',
						text: _.get(data, 'message', 'We sent you instructions'),
						state: 'success',
						delay: 6000
					});
				} }
			>
				{/* Title */}
				<Headline title="Reset password" h={ 2 } />

				{/* Email */}
				<FieldInput name="email" placeholder="name@example.com"
					kind="bigger"
					errPos="right"
					label="Email address"
					validators={ [
						validators.email.valid,
						validators.email.required
					] }
				/>

				{/* Submit */}
				<Btn kind={ { variant: 'general' } } title="Send me instructions"
					onClick={ () => formStore.submit() }
					asyncState={ formStore.asyncState }
				/>

				{/* Notifications area */}
				<NotifyBox />

			</FormRoot>
		</>
	);
};

export default ResetPassword;
