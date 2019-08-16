/**
 * Authentication process the very first route (Sign in)
 */
import React from 'react';
import { Helmet } from 'react-helmet';

import { FormRoot } from '@scc/form';
import { canUseDOM } from '@scc/utils';

import { FieldInput, Btn, Headline } from '@tg/ui';
import { IconGoogleV2 } from '@tg/ui/dist/resources';

import { authFormStore } from '../../../stores';
import { routes } from '../../../config';

// Styles
import { Styles } from './';
import importedStyles from './Auth.module.less';
const styles: Styles = importedStyles;

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
			onSubmitSucceed={ () => canUseDOM() && window.location.assign(routes.poster) }
			styles={ styles.form }
		>
			{/* Title */}
			<Headline title="Sign In" h={1} variation="public" />

			{/* Login/password pair */}
			<FieldInput name="email" placeholder="Email" />
			<FieldInput name="password" placeholder="Password" type="password" />

			{/* Submit */}
			<Btn style={{ main: 'general' }} title="Sign In" />

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
