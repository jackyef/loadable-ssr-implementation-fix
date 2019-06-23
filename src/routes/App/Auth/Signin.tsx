/**
 * Authentication process the very first route (Sign in)
 */
import React from 'react';
import { Helmet } from 'react-helmet';

import { FormRoot } from '@scc/form';

import { authFormStore } from '../../../stores';

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
			styles={ styles.form }
		>
			{/* TODO: Add form content here */}
			<p />
		</FormRoot>
	</>
	);
};

export default SignIn;
