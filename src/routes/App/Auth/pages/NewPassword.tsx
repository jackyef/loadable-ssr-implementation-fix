/**
 * Authentication process the very first route (Sign up)
 */
import _ from 'lodash';
import React, { useEffect } from 'react';
import { Helmet } from 'react-helmet';
import qs from 'qs';

import { StoreForm, StoreFormAPI } from '@tg/form';
import { canUseDOM } from '@tg/utils';
import { Button, Heading } from '@tg/elm';
import { validators } from '@tg/app';
import { service as authService } from '@tg/api-proxy-auth';

import { routes } from 'app/config';
import { NotifyBox, awakeNotification, notifyStore } from '../Notification/utils';
import { StyledForm, StyledInput } from './_styled';

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
			<StyledForm wrapper="form" name="newPassword" inject={ formStore }
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
				<Heading h={ 2 } mb={ 7 } title="Create password" />

				{/* Password */}
				<StyledInput name="password" size="mid" error="top"
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
				<StyledInput name="repeat_password" size="mid" error="top"
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
				<Button width="100%" mt={ 3 } variant="primary"
					title="Change password"
					onClick={ () => formStore.submit() }
				/>

				{/* Notifications area */}
				<NotifyBox />

			</StyledForm>
		</>
	);
};

export default NewPassword;
