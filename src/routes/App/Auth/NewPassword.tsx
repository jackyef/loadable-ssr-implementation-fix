/**
 * Authentication process the very first route (Sign up)
 */
import _ from 'lodash';
import React, { useEffect } from 'react';
import { Helmet } from 'react-helmet';
import qs from 'qs';

import { FormRoot, StoreForm, StoreFormAPI } from '@tg/form';
import { canUseDOM } from '@tg/utils';
import { Button, Heading, NewFieldInput } from '@tg/elm';
import { validators } from '@tg/app';
import { service as authService } from '@tg/api-proxy-auth';

import { routes } from '../../../config';
import { NotifyBox, awakeNotification, notifyStore } from './utils/notification';

// Styles
import { Styles } from './';
import importedStyles from './Auth.module.less';
const styles: Styles = importedStyles;

// Form store
const apiFormStore = new StoreFormAPI(authService.axiosInstance);
const formStore = new StoreForm('auth', null, apiFormStore);

/**
 * Create new password
 */
const NewPassword: React.FC<{}> = () => {

	// mount
	useEffect(() => {
		const querystring = qs.parse(canUseDOM() ? window.location.search : '', { ignoreQueryPrefix: true });
		const token = _.get(querystring, 'token');
		formStore.submitURL =
			`${ authService.shot('user', 'reset_password').options.url }?token=${ token }`
		;
	}, []);

	// Render
	return (
		<>
			<Helmet>
				<title>{ 'Create new password' }</title>
			</Helmet>

			{/* Form */}
			<FormRoot wrapper="form" name="newPassword" inject={ formStore }
				className={ styles.form }
				submitMethod="PATCH"
				onSubmitFailed={ err => awakeNotification(err, formStore) }
				onSubmitSucceed={ () => {
					notifyStore.awake({
						name: 'resetPwdLinkSent',
						text: 'Password was successfully restored. You can use it to login.',
						state: 'success',
						delay: 4000
					});

					// Redirect after notification
					canUseDOM() && setTimeout(() => {
						window.location.assign(routes.auth.signin);
					}, 4000);
				} }
			>
				{/* Title */}
				<Heading h={ 2 } title="Create password" />

				{/* Password */}
				<NewFieldInput name="password" size="mid" error="top"
					type="password"
					placeholder="password"
					label="New password"
					validators={ [
						validators.password.requirements,
						v => validators.password.match(v, formStore.getFieldValue('repeat_password')),
						validators.password.required
					] }
				/>

				{/* Repeat password */}
				<NewFieldInput name="repeat_password" size="mid" error="top"
					type="password"
					placeholder="repeat"
					label="Repeat password"
					validators={ [
						validators.password.requirements,
						v => validators.password.match(v, formStore.getFieldValue('password')),
						validators.password.required
					] }
				/>

				{/* Submit */}
				<Button variant="primary"
					title="Change password"
					onClick={ () => formStore.submit() }
				/>

				{/* Notifications area */}
				<NotifyBox />

			</FormRoot>
		</>
	);
};

export default NewPassword;
