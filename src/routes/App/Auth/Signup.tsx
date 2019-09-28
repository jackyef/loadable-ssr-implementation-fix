/**
 * Authentication process the very first route (Sign up)
 */
import React from 'react';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';

import { FormRoot, StoreForm, StoreFormAPI } from '@scc/form';
import { canUseDOM } from '@scc/utils';

import { Btn, FieldInput, Headline } from '@tg/ui';
import { service as authService } from '@tg/api-proxy-auth';
import { resources } from '@tg/ui/dist/resources';

import { validators } from '../../../utils';
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
			onSubmitSucceed={ () => canUseDOM() && window.location.assign(routes.poster) }
			onSubmitFailed={ awakeNotification }
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
					v => validators.password.match(v, formStore.getFieldValue('re_password')),
					validators.password.required
				]}
			/>

			{/* Repeat password */}
			<FieldInput name="re_password" placeholder="repeat" type="password"
				errPos="right"
				label="Repeat password"
				validators={[
					v => validators.password.match(v, formStore.getFieldValue('password')),
					validators.password.required
				]}
			/>

			{/* Submit */}
			<Btn style={{ main: 'general' }} title="Create account"
				onClick={() => formStore.submit()}
			/>

			{/* Divider */}
			<span>{ 'or' }</span>

			{/* Google */}
			<Btn style={{ main: 'google' }} title="Sign up with Google"
				icon={ resources.icon_google }
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
