/**
 * Authentication process the very first route (Sign up)
 */
import React from 'react';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';

import { FormRoot, StoreForm, StoreFormAPI } from '@tg/form';
import { canUseDOM } from '@tg/utils';

import { Button, Heading, FieldInput } from '@tg/elm';
import { validators } from '@tg/app';
import { service as authService } from '@tg/api-proxy-auth';
import { IconGoogle } from '@tg/resources';

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
				<FieldInput name="email" size="mid" error="top"
					placeholder="name@example.com"
					label="Email"
					validators={ [
						validators.email.valid,
						validators.email.required
					] }
				/>

				{/* Password */}
				<FieldInput name="password" size="mid" error="top"
					type="password"
					placeholder="password"
					label="Password"
					validators={ [
						validators.password.requirements,
						validators.password.required
					] }
				/>

				{/* Submit */}
				<Button variant="primary"
					title="Create account"
					onClick={ () => formStore.submit() }
				/>

				{/* Divider */}
				<span>{ 'or' }</span>

				{/* Google */}
				<Button variant="secondary" iconFill={ false }
					title="Sign up with Google"
					icon={ <IconGoogle /> }
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
