/**
 * Auth route
 */
import React from 'react';
import { RouteConfig } from 'react-router-config';

import { renderRoutes } from '@tg/ui/utils';

type Props = {
	route: RouteConfig & { render?: any };
};

/**
 * Authentication container
 */
const Auth: React.SFC<Props> = ({ route }) => (
	<main>
		{ renderRoutes(route.routes) }
	</main>
);

export default Auth;
