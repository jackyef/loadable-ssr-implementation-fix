/**
 * Authentication process the very first route (Sign in)
 */
import _ from 'lodash';
import React from 'react';
import { Observer } from 'mobx-react';
import { Helmet } from 'react-helmet';

import { StoreForm, StoreFormAPI } from '@tg/form';

import { Button, Heading } from '@tg/elm';
import { validators } from '@tg/app';
import { IconArrow } from '@tg/resources';
import { service as authService } from '@tg/api-proxy-auth';

import { NotifyBox, awakeNotification, notifyStore } from '../Notification/utils';
import { StyledForm, StyledInput } from './_styled';

// Form store
const apiFormStore = new StoreFormAPI(authService.axiosInstance);
const formStore = new StoreForm('auth', null, apiFormStore);

/**
 * Reset user password
 */
const ResetPassword: React.FC<{}> = () => (
	<>
		<Helmet>
			<title>{ 'Reset password' }</title>
		</Helmet>

		{/* Reset password form */}
		<StyledForm wrapper="form" name="reset" inject={ formStore }
			submitMethod="POST"
			submitURL={ authService.shot('user', 'reset_password').options.url }
			onSubmitFailed={ err => awakeNotification(err, formStore) }
			onSubmitSucceed={ data => {
				notifyStore.awake({
					name: 'resetPasswordPostSuccess',
					text: _.get(data, 'message', 'We sent you instructions'),
					state: 'success',
					delay: 6000000
				});
			} }
		>
			{/* Title */}
			<Heading h={ 2 } mb={ 7 } title="Reset password" />

			{/* Email */}
			<StyledInput name="email" size="mid" error="top"
				placeholder="name@example.com"
				label="Email address"
				validators={ [
					validators.email.valid,
					validators.email.required
				] }
			/>

			{/* Submit */}
			<Observer>{ () => (
				<Button width="100%" mt={ 3 } variant="primary"
					icon={ <IconArrow /> }
					iconPos="right"
					iconScale={ -1 }
					title="Send me instructions"
					onClick={ () => formStore.submit() }
					asyncState={ formStore.asyncState }
				/>
			) }</Observer>

			{/* Notifications area */}
			<NotifyBox />

		</StyledForm>
	</>
);

export default ResetPassword;
