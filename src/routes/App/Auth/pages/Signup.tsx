/**
 * Authentication process the very first route (Sign up)
 */
import React from 'react';
import { Helmet } from 'react-helmet';

import { StoreForm, StoreFormAPI } from '@tg/form';
import { canUseDOM } from '@tg/utils';
import { Button, Heading, Paragraph, validators } from '@tg/elm';
import { service as authService } from '@tg/api-proxy-auth';
import { IconGoogle } from '@tg/resources';

import { routes } from 'app/config';
import { awakeFormNotify, FormNotifyBox } from 'app/stores';

import { StyledForm, StyledInput, StyledText, StyledLink } from './_styled';

// Form store
const apiFormStore = new StoreFormAPI(authService.axiosInstance);
export const formStore = new StoreForm('auth', null, apiFormStore);

/**
 * Sign up authentication route container
 */
const SignUp: React.FC<{}> = () => (
	<>
		<Helmet>
			<title>{ 'Create account - Email & Socials' }</title>
		</Helmet>

		{/* Form */}
		<StyledForm name="signup" inject={ formStore }
			submitMethod="POST"
			submitURL={ authService.shot('user', 'register').options.url }
			onSubmitSucceed={ () => canUseDOM() && window.location.assign(routes.poster) }
			onSubmitFailed={ err => awakeFormNotify(err, formStore) }
		>
			{/* Title */}
			<Heading h={ 2 } mb={ 7 } title="Create account" />

			{/* Email*/}
			<StyledInput name="email" size="mid" errPos="top"
				placeholder="name@example.com"
				label="Email"
				validators={ [
					validators.email.valid,
					validators.email.required
				] }
			/>

			{/* Password */}
			<StyledInput name="password" size="mid" errPos="top"
				type="password"
				placeholder="password"
				label="Password"
				validators={ [
					validators.password.requirements,
					validators.password.required
				] }
			/>

			{/* Submit */}
			<Button width="100%" mt={ 3 } variant="primary"
				title="Create account"
				onClick={ () => formStore.submit() }
			/>

			{/* Divider */}
			<StyledText size={ 12 } color="blue_30">{ 'or' }</StyledText>

			{/* Google */}
			<Button width="100%" mt={ 3 } variant="secondary"
				title="Sign up with Google"
				icon={ <IconGoogle /> }
				iconFill={ false }
				onClick={ () => window.location.assign(`
					${ authService.axiosInstance.defaults.baseURL }
					${ authService.shot('user', 'google').options.url }
				`) }
			/>

			{/* PP */}
			<Paragraph centered size={ 14 } mt={ 6 } color="blue_30">
				{ 'By signing up you agree to Platformagram ' }
				<br/>
				<StyledLink to={ routes.pp }>
					{ 'Terms and Conditions and Privacy Policy' }
				</StyledLink>
			</Paragraph>

			<FormNotifyBox />

		</StyledForm>
	</>
);

export default SignUp;
