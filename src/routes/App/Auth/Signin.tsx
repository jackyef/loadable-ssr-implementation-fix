/**
 * Authentication process the very first route (Sign in)
 */
import React from 'react';
import { Helmet } from 'react-helmet';

import { BtnNav, FormRoot, Input, Submit } from '@scc/scc-ui-kit';
import { canUseDOM } from '@scc/scc-ui-kit/utils';

import Logo from '../../../components/Logo';
import { routes, api } from '../../../config';
import { authFormStore, notifyStore } from '../../../stores';
import { history } from '../../../routes';

import { styles as containerStyles } from '../../../styles/routes/Auth/Auth';

/**
 * Sign in authentication route
 */
const SignIn: React.SFC<{}> = () => {
	return (
	<>
		<Helmet>
			<title>{ 'Sign In' }</title>
		</Helmet>

		{/* Illustration */}
		<section className={ containerStyles.illustration }>
			{/* Logo */}
			<Logo />
		</section>

		{/* Form */}
		<section className={ containerStyles.form }>

			<BtnNav url={ routes.auth.signup.self } title="Create account" />

			{/* Sign in form */}
			<FormRoot wrapper="form" name="signin" inject={ authFormStore }>

				{/* Title */}
				<h1>{ 'Sign In' }</h1>

				{/* Google */}
				<BtnNav external title="Continue with Google" icon="fab fa-google"
					url={ api.auth.google }
					styles={{ theme: containerStyles.socials_google }}
				/>

				<hr />

				{/* Email/password */}
				<Input name="email" placeholder="Email" icon="fas fa-envelope" />
				<Input name="password" type="password" placeholder="Password" icon="fas fa-lock" />

				{/* Submit */}
				<Submit form={ authFormStore } title="Continue with email"
					url={ api.auth.login }
					styles={{ theme: containerStyles.btn }}

					onSuccess={() => {

						// Login user OK
						if (canUseDOM()) {
							localStorage.setItem('authenticated', 'yes');
							history.push(routes.workflow.self);
							notifyStore.awake({
								name: 'loginSucceed',
								header: 'You are successfully logged in',
								text: '',
								state: 'success',
								delay: 3000
							});
						}
					}}

					onFailure={err => {

						// User login failed
						notifyStore.awake({
							name: 'loginFailed',
							header: 'Oops! Something goes wrong',
							text: err,
							state: 'error'
						});
					}}
				/>

			</FormRoot>

		</section>
	</>
	);
};

export default SignIn;
