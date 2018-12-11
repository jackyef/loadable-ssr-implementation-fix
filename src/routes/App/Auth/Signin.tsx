/**
 * Authentication process the very first route (Sign in)
 */
import React from 'react';
import { Helmet } from 'react-helmet';

import { FormRoot, canUseDOM } from '@scc/ui-kit';
import { Submit } from '@scc/ui-kit/addons';
import { required, email } from '@scc/ui-kit/addons/validators';

import { Btn, Headline, FieldInput } from '@tg/ui';
import { api } from '@tg/ui/config';
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
			<FieldInput name="password" type="password" placeholder="Password"
				validators={[ required ]}
				stl={ styles.field }
			/>

			{/* Submit */}
			{/* TODO: Rotate arrow icon 180deg */}
			<Submit form={ authFormStore } title="Login with email" url={ api.auth.urls.login }
				icon={ IconArrowV2 } iconPos="right"
				styles={{ theme: styles.submit }}
				onSuccess={ () => canUseDOM() && window.location.assign(routes.poster) }
			/>

			{/* Socials (Google) */}
			<Btn nav external style="google" title="or continue with Google" url={ api.auth.urls.google }
				icon={ IconGoogle }
				className={ styles.google }
			/>

		</FormRoot>
	</>
	);
};

export default SignIn;
