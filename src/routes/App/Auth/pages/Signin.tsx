/**
 * Authentication process the very first route (Sign in)
 */
import React from 'react';
import { Helmet } from 'react-helmet';
import Cookies from 'js-cookie';

import { StoreForm, StoreFormAPI } from '@tg/form';
import { canUseDOM } from '@tg/utils';
import { Button, Heading, Paragraph, FieldLabel, validators } from '@tg/elm';
import { service as authService } from '@tg/api-proxy-auth';
import { IconGoogle } from '@tg/resources';

import { history } from 'app/routes';
import { routes } from 'app/config';
import { awakeFormNotify, FormNotifyBox, Errors } from 'app/stores';

import { StyledForm, StyledInput, StyledText, StyledLink } from './_styled';

// Form store
const apiFormStore = new StoreFormAPI(authService.axiosInstance);
const formStore = new StoreForm('auth', null, apiFormStore);

const SignIn: React.FC = () => (
	<>
		<Helmet>
			<title>{ 'Sign in' }</title>
		</Helmet>

		{/* Sign in form */}
		<StyledForm name="signin" inject={ formStore }
			submitMethod="POST"
			submitURL={ authService.shot('user', 'login').options.url }
			onSubmitSucceed={ () => {

				// Set user claims token to local storage from cookies
				// Redirect to app
				if (canUseDOM()) {
					localStorage.setItem('id_token', Cookies.get('id_token'));
					Cookies.remove('id_token');
					window.location.assign(routes.poster);
				}
			} }
			onSubmitFailed={ (err: Errors) => awakeFormNotify(err, formStore) }
		>
			{/* Title */}
			<Heading h={ 2 } mb={ 7 } title="Welcome back" />

			{/* Email */}
			<StyledInput name="email" size="mid" errPos="top"
				label="Email"
				placeholder="name@example.com"
				validators={ [
					validators.email.valid,
					validators.email.required
				] }
			/>

			{/* Password */}
			<StyledInput name="password" size="mid" errPos="top"
				type="password"
				placeholder="password"
				validators={ [
					validators.password.requirements,
					validators.password.required
				] }
				label="Password"
				labelComp={ ({ label, id }) => (
					<FieldLabel label={ label } id={ id }>
						<Button variant="inline" color="blue_100" size="mid"
							title="Forgot password?"
							onClick={ () => { history.push(routes.auth.reset); } }
						/>
					</FieldLabel>
				) }
			/>

			{/* Submit */}
			<Button width="100%" mt={ 3 } variant="primary"
				title="Sign in"
				onClick={ () => {
					formStore.submit()
						.catch(err => { throw(err) })
					;
				} }
			/>

			{/* Divider */}
			<StyledText size={ 12 } color="blue_30">{ 'or' }</StyledText>

			{/* Google */}
			<Button width="100%" mt={ 3 } variant="secondary"
				title="Sign in with Google"
				icon={ <IconGoogle /> }
				iconFill={ false }
				onClick={ () => window.location.assign(`
					${ authService.axiosInstance.defaults.baseURL }
					${ authService.shot('user', 'google').options.url }
				`) }
			/>

			{/* PP */}
			<Paragraph centered size={ 14 } mt={ 6 } color="blue_30">
				{ 'By signing in you agree to Prostpost ' }
				<br/>
				<StyledLink to={ routes.pp }>
					{ 'Terms and Conditions and Privacy Policy' }
				</StyledLink>
			</Paragraph>

			<FormNotifyBox />

		</StyledForm>
	</>
);

export default SignIn;
