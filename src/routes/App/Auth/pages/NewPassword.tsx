/**
 * Authentication process the very first route (Sign up)
 */
import React, { useEffect } from 'react';
import { Helmet } from 'react-helmet';
import qs from 'qs';

import { StoreForm, StoreFormAPI } from '@prostpost/form';
import { canUseDOM } from '@prostpost/utils';
import { Button, Heading, validators } from '@prostpost/elm';
import { service as authService } from '@prostpost/api-proxy-auth';

import { routes } from 'app/config';
import {
	notifyFormStore,
	awakeFormNotify,
	FormNotifyBox,
	Errors
} from 'app/stores';

import { StyledForm, StyledInput } from './_styled';

// Form store
const apiFormStore = new StoreFormAPI(authService.axiosInstance);
const formStore = new StoreForm('auth', null, apiFormStore);

const NewPassword: React.FC = () => {

	// mount
	useEffect(() => {
		const querystring = qs.parse(canUseDOM() ? window.location.search : '', { ignoreQueryPrefix: true });
		const token = querystring?.token as string;
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
			<StyledForm name="newPassword" inject={ formStore }
				submitMethod="PATCH"
				onSubmitFailed={ (err: Errors) => awakeFormNotify(err, formStore) }
				onSubmitSucceed={ (): void => {
					notifyFormStore.awake({
						text: 'Password was successfully restored. You can use it to login.',
						state: 'success'
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
				<StyledInput name="password" size="mid" errPos="top"
					type="password"
					placeholder="password"
					label="New password"
					validators={ [
						validators.password.requirements,
						(v: string) => validators.password.match(v, formStore.getFieldValue('repeat_password')),
						validators.password.required
					] }
				/>

				{/* Repeat password */}
				<StyledInput name="repeat_password" size="mid" errPos="top"
					type="password"
					placeholder="repeat"
					label="Repeat password"
					validators={ [
						validators.password.requirements,
						(v: string) => validators.password.match(v, formStore.getFieldValue('password')),
						validators.password.required
					] }
				/>

				{/* Submit */}
				<Button width="100%" mt={ 3 } variant="primary"
					title="Change password"
					onClick={ () => {
						formStore.submit()
							.catch(err => { throw(err) })
						;
					} }
				/>

				<FormNotifyBox />

			</StyledForm>
		</>
	);
};

export default NewPassword;
