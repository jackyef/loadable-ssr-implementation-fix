/**
 * Authentication process the very first route (Sign in)
 */
import React from 'react';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';

import { FormRoot, StoreForm, StoreFormAPI } from '@scc/form';
import { canUseDOM } from '@scc/utils';

import { FieldInput, Btn, Headline, customValidators as validators } from '@tg/ui';
import { service as authService } from '@tg/api-proxy-auth';
import { resources } from '@tg/ui/dist/resources';

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
			<title>{ 'Sign In' }</title>
		</Helmet>

		{/* Sign in form */}
		<FormRoot wrapper="form" name="signin" inject={ formStore }
			styles={ styles.form }
			submitMethod="POST"
			submitURL={ authService.shot('user', 'login').options.url }
			onSubmitSucceed={ () => canUseDOM() && window.location.assign(routes.poster) }
			onSubmitFailed={ err => awakeNotification(err, formStore) }
		>
			{/* Title */}
			<Headline title="Welcome back" h={2} variation="public" />

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

			{/* Password */}
			<FieldInput name="password" placeholder="password" type="password"
				errPos="right"
				validators={[
					validators.password.requirements,
					validators.password.required
				]}
				label={
					<div>
						<span>{'Password'}</span>
						<Btn style={{ main: 'inline' }}
							title="Forgot password?"
							onClick={() => { history.push(routes.auth.reset); }}
						/>
					</div>
				}
			/>

			{/* Submit */}
			<Btn style={{ main: 'general' }} title="Sign In"
				onClick={() => formStore.submit()}
			/>

			{/* Divider */}
			<span>{ 'or' }</span>

			{/* Google */}
			<Btn nav external style={{ main: 'google' }} title="Sign in with Google"
				icon={ resources.icon_google }
				url={`
					${authService.axiosInstance.defaults.baseURL}
					${authService.shot('user', 'google').options.url}
				`}
			/>

			{/* PP */}
			<p className={ styles.pp }>
				{ 'By signing in you agree to Platformagram ' }
				<br/>
				<Link to={ routes.pp }>
					{ 'Terms and Conditions and Privacy Policy' }
				</Link>
			</p>

		</FormRoot>
	</>
	);
};

export default SignIn;
