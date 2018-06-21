/**
 * Authentication process the very first route (Sign up)
 */
import React from 'react';
import { RouteConfig } from 'react-router-config';
import { Helmet } from 'react-helmet';

import { FormRoot, BtnNav } from '@scc/scc-ui-kit';
import { FieldInput as Input, Submit } from '@scc/scc-ui-kit/addons';
import { required, email } from '@scc/scc-ui-kit/addons/validators';

import { Logo } from '@tg/ui';
import { authenticated } from '@tg/ui/utils';

import { authFormStore, notifyStore } from '../../../stores';
import { api, routes } from '../../../config';

import { SIGNUP_FAILED_ON_EMAIL } from '../../../config/messages';

type Props = {
	route: RouteConfig & { render?: any };
};

/**
 * Sign up authentication route container
 */
const SignUp: React.SFC<Props> = () => {
	return (
	<>
		{/* Form */}
		<section>

			{/* Logo */}
			<Logo />

			<Helmet>
				<title>{ 'Sign Up - Email & Socials' }</title>
			</Helmet>

			{/* Sign up form */}
			<FormRoot wrapper="form" name="signup" inject={ authFormStore }
				onSubmitFailed={
					err => {
						notifyStore.awake({
							name: 'signUpFailed',
							header: SIGNUP_FAILED_ON_EMAIL.text,
							text: err[0],
							state: 'error',
							delay: 5000
						});
					}
				}
			>
				{/* Title */}
				<h1>{ 'Sign Up' }</h1>

				{/* Socials */}
				<BtnNav external title="Continue with Google" icon="fab fa-google" url={ api.auth.google } />

				{/* Divider */}
				<hr />

				{/* Email */}
				<Input name="email" placeholder="Email" icon="fas fa-envelope"
					validators={[required, email]}
				/>

				{/* Password */}
				<Input name="password" type="password"
					icon="fas fa-lock" placeholder="Password"
					validators={[ required ]}
				/>

				{/* Repeat password */}
				<Input name="repeat_password" type="password"
					icon="fas fa-lock" placeholder="Repeat password"
					validators={[ required ]}
				/>

				{/* Submit */}
				<Submit form={ authFormStore } title="Continue with email" url={ api.auth.register } />

			</FormRoot>

		</section>

		{/* Illustration */}
		<section>
			{ !authenticated() ? <BtnNav url={ routes.auth.signin } title="Already have an account?" /> : null }
		</section>
	</>
	);
};

export default SignUp;
