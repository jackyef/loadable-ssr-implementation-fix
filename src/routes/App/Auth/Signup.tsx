/**
 * Authentication process the very first route (Sign up)
 */
import React from 'react';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';

import { FormRoot, StoreForm, StoreFormAPI } from '@scc/form';
import { canUseDOM } from '@scc/utils';

import { Btn, FieldInput, Headline, customValidators as validators } from '@tg/ui';
import { service as authService } from '@tg/api-proxy-auth';
import { resources } from '@tg/ui/dist/resources';

import { routes } from '../../../config';

import { NotifyBox, awakeNotification } from './utils/notification';

// Styles
import { Styles } from './';
import importedStyles from './Auth.module.less';
const styles: Styles = importedStyles;

// Form store
const apiFormStore = new StoreFormAPI(authService.axiosInstance);
export const formStore = new StoreForm('auth', null, apiFormStore);

/**
 * Sign up authentication route container
 */
const SignUp: React.FC<{}> = () => {
	return (
	<>
		<Helmet>
			<title>{ 'Create account - Email & Socials' }</title>
		</Helmet>

		{/* Form */}
		<FormRoot wrapper="form" name="signup" inject={ formStore }
			styles={ styles.form }
			submitMethod="POST"
			submitURL={ authService.shot('user', 'register').options.url }
			onSubmitSucceed={ () => canUseDOM() && window.location.assign(routes.poster) }
			onSubmitFailed={ err => awakeNotification(err, formStore) }
		>
			{/* Title */}
			<Headline title="Create account" h={2} variation="public" />

			{/* Notifications area */}
			<NotifyBox />

			{/* Email*/}
			<FieldInput name="email" placeholder="name@example.com"
				errPos="right"
				label="Email"
				validators={[
					validators.email.valid,
					validators.email.required
				]}
			/>

			{/* Password */}
			<FieldInput name="password" placeholder="password" type="password"
				errPos="right"
				label="Password"
				validators={[
					validators.password.requirements,
					v => validators.password.match(v, formStore.getFieldValue('repeat_password')),
					validators.password.required
				]}
			/>

			{/* Repeat password */}
			<FieldInput name="repeat_password" placeholder="repeat" type="password"
				errPos="right"
				label="Repeat password"
				validators={[
					validators.password.requirements,
					v => validators.password.match(v, formStore.getFieldValue('password')),
					validators.password.required
				]}
			/>

			{/* Submit */}
			<Btn submit form={ formStore } title="Create account"
				style={{ main: 'general' }}
			/>

			{/* Divider */}
			<span>{ 'or' }</span>

			{/* Google */}
			<Btn nav external style={{ main: 'google' }} title="Sign up with Google"
				icon={ resources.icon_google }
				url={`
					${authService.axiosInstance.defaults.baseURL}
					${authService.shot('user', 'google').options.url}
				`}
			/>

			{/* PP */}
			<p className={ styles.pp }>
				{ 'By signing up you agree to Platformagram ' }
				<br/>
				<Link to={ routes.pp }>
					{ 'Terms and Conditions and Privacy Policy' }
				</Link>
			</p>

		</FormRoot>
	</>
	);
};

export default SignUp;
