/**
 * Authentication process the very first route (Sign in)
 */
import _ from 'lodash';
import React from 'react';
import { Helmet } from 'react-helmet';

import { FormRoot, StoreForm, StoreFormAPI } from '@tg/form';

import { Button, Heading, NewFieldInput } from '@tg/elm';
import { validators } from '@tg/app';
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
				className={ styles.form }
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
				<Heading h={ 2 } title="Reset password" />

				{/* Email */}
				<NewFieldInput name="email" size="mid" error="top"
					placeholder="name@example.com"
					label="Email address"
					validators={ [
						validators.email.valid,
						validators.email.required
					] }
				/>

				{/* Submit */}
				<Button variant="primary"
					title="Send me instructions"
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
