/**
 * Authentication process the very first route (Sign in)
 */
import React from 'react';
import { Helmet } from 'react-helmet';

import { FormRoot, StoreForm, StoreFormAPI } from '@scc/form';
import { canUseDOM } from '@scc/utils';

import { FieldInput, Btn, Headline, customValidators as validators } from '@tg/ui';
import { service as authService } from '@tg/api-proxy-auth';

import { routes } from '../../../config';

import { NotifyBox, awakeNotification } from './utils/notification';

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
				onSubmitSucceed={ () => canUseDOM() && window.location.assign(routes.poster) }
				onSubmitFailed={ err => awakeNotification(err, formStore) }
			>
				{/* Title */}
				<Headline title="Reset password" h={2} variation="public" />

				{/* Notifications area */}
				<NotifyBox />

				{/* Email */}
				<FieldInput name="email" placeholder="name@example.com"
					errPos="right"
					label="Email address"
					validators={[
						validators.email.valid,
						validators.email.required
					]}
				/>

				{/* Submit */}
				<Btn style={{ main: 'general' }} title="Send me instructions"
					onClick={() => formStore.submit()}
				/>

			</FormRoot>
		</>
	);
};

export default ResetPassword;
