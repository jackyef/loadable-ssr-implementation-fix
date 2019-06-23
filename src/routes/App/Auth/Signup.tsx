/**
 * Authentication process the very first route (Sign up)
 */
import React from 'react';
import { RouteConfig } from 'react-router-config';
import { Helmet } from 'react-helmet';

import { FormRoot } from '@scc/form';
import { canUseDOM } from '@scc/utils';

import { authFormStore } from '../../../stores';
import { routes } from '../../../config';

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
			{/* TODO: Add form content here */}
			<p />
		</FormRoot>
	</>
	);
};

export default SignUp;
