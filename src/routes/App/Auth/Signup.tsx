/**
 * Authentication process the very first route (Sign up)
 */
import React from 'react';
import { RouteConfig } from 'react-router-config';
import { Helmet } from 'react-helmet';

import { FormRoot, Submit, validators } from '@scc/form';
import { canUseDOM } from '@scc/utils';
const { required, email } = validators;

import { Btn, Headline, FieldInput } from '@tg/ui';
import { service as authService } from '@tg/api-proxy-auth';
import { IconArrowV2, IconGoogle } from '@tg/ui/resources';

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
const SignUp: React.FC<Props> = () => {
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
			<FieldInput name="password" type={'password' as any} placeholder="Password"
				validators={[ required ]}
				stl={ styles.field }
			/>

			{/* Repeat password */}
			<FieldInput name="repeat_password" type={'password' as any} placeholder="Repeat password"
				validators={[ required ]}
				stl={ styles.field }
			/>

			{/* Submit */}
			{/* TODO: Rotate icon 180deg */}
			<Submit form={authFormStore} title="Join us with email"
				url={ authService.resources.user.snapshots.register.options.url }
				icon={ IconArrowV2 } iconPos="right"
				styles={{ theme: styles.submit }}
			/>

			{/* Socials (Google) */}
			<Btn nav external style={{main: 'google'}} title="or continue with Google"
				url={ authService.resources.user.snapshots.google.options.url }
				icon={ IconGoogle }
				className={ styles.google }
			/>

		</FormRoot>
	</>
	);
};

export default SignUp;
