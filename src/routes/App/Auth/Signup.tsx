/**
 * Authentication process the very first route (Sign up)
 */
import React from 'react';
import { RouteConfig } from 'react-router-config';
import { Helmet } from 'react-helmet';

import { FormRoot, canUseDOM } from '@scc/ui-kit';
import { Submit } from '@scc/ui-kit/addons';
import { required, email } from '@scc/ui-kit/addons/validators';

import { Btn, Headline, FieldInput } from '@tg/ui';
import { api } from '@tg/ui/config';
import resources from '@tg/ui/resources';

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
	return (
	<>
		<Helmet>
			<title>{ 'Create account - Email & Socials' }</title>
		</Helmet>

		{/* Form */}
		<FormRoot wrapper="form" name="signup" inject={ authFormStore }
			styles={ styles.form }
			onSubmitSucceed={ () => canUseDOM() && window.location.assign(routes.poster) }
		>
			{/* Title */}
			<Headline h={1} title="Create account" />

			{/* Email */}
			<FieldInput name="email" placeholder="Email"
				validateOnBlur validators={[required, email]}
				stl={ styles.field }
			/>

			{/* Password */}
			<FieldInput name="password" type="password" placeholder="Password"
				validators={[ required ]}
				stl={ styles.field }
			/>

			{/* Repeat password */}
			<FieldInput name="repeat_password" type="password" placeholder="Repeat password"
				validators={[ required ]}
				stl={ styles.field }
			/>

			{/* Submit */}
			<Submit form={ authFormStore } title="Join us with email" url={ api.auth.register }
				icon={ resources.icon_read_more } iconPos="right"
				styles={{ theme: styles.submit }}
			/>

			{/* Socials (Google) */}
			<Btn nav external style="google" title="or continue with Google" url={ api.auth.google }
				icon={ resources.icon_google }
				className={ styles.google }
			/>

		</FormRoot>
	</>
	);
};

export default SignUp;
