/**
 * Authentication process the very first route (Sign up)
 */
import React from 'react';
import { RouteConfig } from 'react-router-config';
import { Helmet } from 'react-helmet';

import { FormRoot } from '@scc/form';
import { canUseDOM } from '@scc/utils';

import { Btn, FieldInput, Headline } from '@tg/ui';
import { IconGoogle } from '@tg/ui/dist/resources';

import { authFormStore } from '../../../stores';
import { routes } from '../../../config';

// Styles
import { Styles } from './';
import importedStyles from './Auth.module.less';
const styles: Styles = importedStyles;

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
			<Headline title="Join" h={1} variation="public" />

			{/* Login/password pair */}
			<FieldInput name="email" placeholder="Email" />
			<FieldInput name="password" placeholder="Password" type="password" />
			<FieldInput name="re_password" placeholder="Repeat password" type="password" />

			{/* Submit */}
			<Btn style={{ main: 'general' }} title="Create account" />

			{/* Divider */}
			<span>{ 'or' }</span>

			{/* Google */}
			<Btn style={{ main: 'google' }} title="Join with Google"
				icon={<IconGoogle />}
			/>

		</FormRoot>
	</>
	);
};

export default SignUp;
