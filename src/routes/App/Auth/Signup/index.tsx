/**
 * Authentication process the very first route (Sign up)
 */
import React from 'react';
import { RouteConfig } from 'react-router-config';

import { BtnNav } from '@scc/scc-ui-kit';
import { Logo } from '@tg/ui';
import { renderRoutes, authenticated } from '@tg/ui/utils';

import { routes } from '../../../../config';

import { styles as containerStyles } from '../../../../styles/routes/Auth/Auth';

type Props = {
	route: RouteConfig & { render?: any };
};

/**
 * Sign up authentication route container
 */
const SignUp: React.SFC<Props> = ({ route }) => {
	return (
	<>
		{/* Form */}
		<section className={ containerStyles.form }>

			{/* Logo */}
			<Logo />

			{/* Sub routes */}
			{ renderRoutes(route.routes) }

		</section>

		{/* Illustration */}
		<section className={ containerStyles.illustration }>
			{ !authenticated() ? <BtnNav url={ routes.auth.signin } title="Already have an account?" /> : null }
		</section>
	</>
	);
};

export default SignUp;
