/**
 * Authentication process the very first route (Sign in)
 */
import React from 'react';
import { Observer } from 'mobx-react';
import { Helmet } from 'react-helmet';

import { StoreForm, StoreFormAPI } from '@prostpost/form';
import { Button, Heading, validators } from '@prostpost/elm';
import { IconArrow } from '@prostpost/resources';
import { service as authService } from '@prostpost/api-proxy-auth';

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

const ResetPassword: React.FC = () => (
	<>
		<Helmet>
			<title>{ 'Reset password' }</title>
		</Helmet>

		{/* Reset password form */}
		<StyledForm name="reset" inject={ formStore }
			submitMethod="POST"
			submitURL={ authService.shot('user', 'reset_password').options.url }
			onSubmitFailed={(err: Errors) => awakeFormNotify(err, formStore) }
			onSubmitSucceed={ ({ message }: { message: string }) => {
				notifyFormStore.awake({
					text: message || 'We sent you instructions',
					state: 'success'
				});
			} }
		>
			{/* Title */}
			<Heading h={ 2 } mb={ 7 } title="Reset password" />

			{/* Email */}
			<StyledInput name="email" size="mid" errPos="top"
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
					asyncState={ formStore.asyncState }
					onClick={ () => {
						formStore.submit()
							.catch(err => { throw(err) })
						;
					} }
				/>
			) }</Observer>

			<FormNotifyBox />

		</StyledForm>
	</>
);

export default ResetPassword;
