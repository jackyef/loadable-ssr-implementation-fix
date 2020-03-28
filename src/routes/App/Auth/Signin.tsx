/**
 * Authentication process the very first route (Sign in)
 */
import React from 'react';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';
import Cookies from 'js-cookie';

import { FormRoot, StoreForm, StoreFormAPI } from '@tg/form';
import { canUseDOM } from '@tg/utils';

import { Btn, Heading } from '@tg/elm';
import { FieldInput, validators } from '@tg/app';
import { service as authService } from '@tg/api-proxy-auth';
import { resources } from '@tg/resources';

import { history } from '../../';
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
 * Sign in authentication route
 */
const SignIn: React.FC<{}> = () => {
	return (
		<>
			<Helmet>
				<title>{ 'Sign in' }</title>
			</Helmet>

			{/* Sign in form */}
			<FormRoot wrapper="form" name="signin" inject={ formStore }
				className={ styles.form }
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
				onSubmitFailed={ err => awakeNotification(err, formStore) }
			>
				{/* Title */}
				<Heading h={ 2 } title="Welcome back" />

				{/* Email */}
				<FieldInput name="email" placeholder="name@example.com"
					kind="bigger"
					errPos="right"
					label="Email"
					validators={ [
						validators.email.valid,
						validators.email.required
					] }
				/>

				{/* Password */}
				<FieldInput name="password" placeholder="password" type="password"
					kind="bigger"
					errPos="right"
					validators={ [
						validators.password.requirements,
						validators.password.required
					] }
					label={
						<div>
							<span>{ 'Password' }</span>
							<Btn kind={ { variant: 'inline' } }
								title="Forgot password?"
								onClick={ () => { history.push(routes.auth.reset); } }
							/>
						</div>
					}
				/>

				{/* Submit */}
				<Btn kind={ { variant: 'general' } }
					title="Sign in"
					onClick={ () => formStore.submit() }
				/>

				{/* Divider */}
				<span>{ 'or' }</span>

				{/* Google */}
				<Btn kind={ { variant: 'general', color: 'white-100' } }
					title="Sign in with Google"
					icon={ resources.icon_google }
					onClick={ () => window.location.assign(`
						${ authService.axiosInstance.defaults.baseURL }
						${ authService.shot('user', 'google').options.url }
					`) }
				/>

				{/* PP */}
				<p className={ styles.pp }>
					{ 'By signing in you agree to Platformagram ' }
					<br/>
					<Link to={ routes.pp }>
						{ 'Terms and Conditions and Privacy Policy' }
					</Link>
				</p>

				{/* Notifications area */}
				<NotifyBox />

			</FormRoot>
		</>
	);
};

export default SignIn;
