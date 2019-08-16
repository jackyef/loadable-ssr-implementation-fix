/**
 * Authentication process the very first route (Sign in)
 */
import React from 'react';
import { Helmet } from 'react-helmet';

import { FormRoot, StoreForm, StoreFormAPI } from '@scc/form';
import { canUseDOM } from '@scc/utils';

import { FieldInput, Btn, Headline } from '@tg/ui';
import { service as authService } from '@tg/api-proxy-auth';
import { IconGoogleV2 } from '@tg/ui/dist/resources';

import { routes } from '../../../config';
import { validators } from '../../../utils';

// Styles
import { Styles } from './';
import importedStyles from './Auth.module.less';
const styles: Styles = importedStyles;

// Form store
const apiFormStore = new StoreFormAPI(authService.axiosInstance);
const formStore = new StoreForm('auth', null, apiFormStore);

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
		<FormRoot wrapper="form" name="signin" inject={ formStore }
			onSubmitSucceed={ () => canUseDOM() && window.location.assign(routes.poster) }
			styles={ styles.form }
		>
			{/* Title */}
			<Headline title="Sign In" h={1} variation="public" />

			{/* Email */}
			<FieldInput name="email" placeholder="Email"
				validators={[
					validators.email.valid,
					validators.email.required
				]}
			/>

			{/* Password */}
			<FieldInput name="password" placeholder="Password" type="password"
				validators={[validators.password.required]}
			/>

			{/* Submit */}
			<Btn style={{ main: 'general' }} title="Sign In"
				onClick={() => formStore.submit()}
			/>

			{/* Divider */}
			<span>{ 'or' }</span>

			{/* Google */}
			<Btn style={{ main: 'google' }} title="Sign in with Google"
				icon={ <IconGoogleV2 /> }
			/>

		</FormRoot>
	</>
	);
};

export default SignIn;
