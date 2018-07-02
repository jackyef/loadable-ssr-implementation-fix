/**
 * Authentication process the very first route (Sign up)
 */
import React from 'react';
import { RouteConfig } from 'react-router-config';
import { Helmet } from 'react-helmet';

import { FormRoot, BtnNav, canUseDOM } from '@scc/scc-ui-kit';
import { FieldInput as Input, Submit } from '@scc/scc-ui-kit/addons';
import { required, email } from '@scc/scc-ui-kit/addons/validators';

import { authFormStore } from '../../../stores';
import { api, routes, staticImagesPath } from '../../../config';

import { styles } from '../../../styles/routes/Auth';

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
			onSubmitSucceed={
				() => {
					canUseDOM() && window.location.assign(routes.poster);
				}
			}
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
				icon={`${ staticImagesPath }/icon_read_more.svg`} iconPos="right"
				styles={{ theme: styles.submit }}
			/>

			{/* Socials (Google) */}
			<BtnNav external title="or continue with Google" url={ api.auth.google }
				icon={`${ staticImagesPath }/icon_google.svg`}
				styles={{ theme: styles.google }}
			/>

		</FormRoot>
	</>
	);
};

export default SignUp;
