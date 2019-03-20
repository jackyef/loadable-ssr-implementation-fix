/**
 * Authentication process the very first route (Sign in)
 */
import React from 'react';
import { Helmet } from 'react-helmet';

import { canUseDOM } from '@scc/utils';
import { FormRoot, Submit } from '@scc/form';
import { required, email } from '@scc/form/validators';

import { Btn, Headline, FieldInput } from '@tg/ui';
import { service as authService } from '@tg/api-proxy-auth';
import { IconGoogle, IconArrowV2 } from '@tg/ui/resources';

import { routes } from '../../../config';
import { authFormStore } from '../../../stores';

import { Styles } from './';
const styles: Styles = require('./Auth.module.less');

/**
 * Sign in authentication route
 */
const SignIn: React.FC<{}> = () => {
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
			<Headline h={1} title="Sign In" />

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

			{/* Submit */}
			{/* TODO: Rotate arrow icon 180deg */}
			<Submit form={ authFormStore } title="Login with email"
				url={ authService.resources.user.snapshots.login.options.url }
				icon={ IconArrowV2 } iconPos="right"
				styles={{ theme: styles.submit }}
				onSuccess={ () => canUseDOM() && window.location.assign(routes.poster) }
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

export default SignIn;
