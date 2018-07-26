/**
 * Authentication process the very first route (Sign in)
 */
import React from 'react';
import { Helmet } from 'react-helmet';

import { FormRoot, canUseDOM } from '@scc/scc-ui-kit';
import { FieldInput as Input, Submit } from '@scc/scc-ui-kit/addons';
import { required, email } from '@scc/scc-ui-kit/addons/validators';
import { Btn } from '@tg/ui';

import { routes, api, staticImagesPath } from '../../../config';
import { authFormStore } from '../../../stores';

import { styles } from '../../../styles/routes/Auth';

/**
 * Sign in authentication route
 */
const SignIn: React.SFC<{}> = () => {

	// Fields styles
	const stylesField = {
		theme: styles.field,
		theme__focus: styles.field_focus,
		theme__error: styles.field_error
	};

	const commonFieldProps = {
		errPos: null as any,
		styles: stylesField
	};

	return (
	<>
		<Helmet>
			<title>{ 'Sign In' }</title>
		</Helmet>

		{/* Sign in form */}
		<FormRoot wrapper="form" name="signin" inject={ authFormStore }
			styles={ styles.form }
		>

			{/* Title */}
			<h1>{ 'Log In' }</h1>

			{/* Email */}
			<Input name="email" placeholder="Email"
				validateOnBlur validators={[required, email]}
				{ ...commonFieldProps }
			/>

			{/* Password */}
			<Input name="password" type="password" placeholder="Password"
				validators={[ required ]}
				{ ...commonFieldProps }
			/>

			{/* Submit */}
			<Submit form={ authFormStore } title="Login with email" url={ api.auth.login }
				icon={`${ staticImagesPath }/icon_read_more.svg`} iconPos="right"
				styles={{ theme: styles.submit }}
				onSuccess={ () => canUseDOM() && window.location.assign(routes.poster) }
			/>

			{/* Socials (Google) */}
			<Btn nav type="google" external title="or continue with Google" url={ api.auth.google }
				icon={`${ staticImagesPath }/icon_google.svg`}
				className={ styles.google }
			/>

		</FormRoot>
	</>
	);
};

export default SignIn;
