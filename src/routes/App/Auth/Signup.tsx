/**
 * Authentication process the very first route (Sign up)
 */
import React from 'react';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';

import { FormRoot, StoreForm, StoreFormAPI } from '@tg/form';
import { canUseDOM } from '@tg/utils';

import { Btn, Heading } from '@tg/elm';
import { FieldInput, validators } from '@tg/app';
import { service as authService } from '@tg/api-proxy-auth';
import { resources } from '@tg/resources';

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
				className={ styles.form }
				submitMethod="POST"
				submitURL={ authService.shot('user', 'register').options.url }
				onSubmitSucceed={ () => canUseDOM() && window.location.assign(routes.poster) }
				onSubmitFailed={ err => awakeNotification(err, formStore) }
			>
				{/* Title */}
				<Heading h={ 2 } title="Create account" />

				{/* Email*/}
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
					label="Password"
					validators={ [
						validators.password.requirements,
						validators.password.required
					] }
				/>

				{/* Submit */}
				<Btn title="Create account"
					kind={ { variant: 'general' } }
					onClick={ () => formStore.submit() }
				/>

				{/* Divider */}
				<span>{ 'or' }</span>

				{/* Google */}
				<Btn kind={ { variant: 'general', color: 'white-100' } }
					title="Sign up with Google"
					icon={ resources.icon_google }
					onClick={ () => window.location.assign(`
						${ authService.axiosInstance.defaults.baseURL }
						${ authService.shot('user', 'google').options.url }
					`) }
				/>

				{/* PP */}
				<p className={ styles.pp }>
					{ 'By signing up you agree to Platformagram ' }
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

export default SignUp;
