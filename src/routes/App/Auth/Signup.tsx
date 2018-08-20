/**
 * Authentication process the very first route (Sign up)
 */
import React from 'react';
import { RouteConfig } from 'react-router-config';
import { Helmet } from 'react-helmet';

import { FormRoot, canUseDOM } from '@scc/ui-kit';
import { FieldInput as Input, Submit } from '@scc/ui-kit/addons';
import { required, email } from '@scc/ui-kit/addons/validators';

import { Btn } from '@tg/ui';
import { api } from '@tg/ui/config';
const icons = require('@tg/ui/resources');

import { authFormStore } from '../../../stores';
import { routes } from '../../../config';

import { Styles } from './';
const styles: Styles = require('./Auth.module.less');

type Props = {
	route: RouteConfig & { render?: any };
};

/**
 * Sign up authentication route container
 */
const SignUp: React.SFC<Props> = () => {

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
			<title>{ 'Sign Up - Email & Socials' }</title>
		</Helmet>

		{/* Form */}
		<FormRoot wrapper="form" name="signup" inject={ authFormStore }
			styles={ styles.form }
			onSubmitSucceed={ () => canUseDOM() && window.location.assign(routes.poster) }
		>
			{/* Title */}
			<h1>{ 'Sign Up' }</h1>

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

			{/* Repeat password */}
			<Input name="repeat_password" type="password" placeholder="Repeat password"
				validators={[ required ]}
				{ ...commonFieldProps }
			/>

			{/* Submit */}
			<Submit form={ authFormStore } title="Join us with email" url={ api.auth.register }
				icon={ icons.icon_read_more } iconPos="right"
				styles={{ theme: styles.submit }}
			/>

			{/* Socials (Google) */}
			<Btn nav external style="google" title="or continue with Google" url={ api.auth.google }
				icon={ icons.icon_google }
				className={ styles.google }
			/>

		</FormRoot>
	</>
	);
};

export default SignUp;
