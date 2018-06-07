/**
 * Auth route
 */
import React from 'react';
import { RouteConfig } from 'react-router-config';

import { renderRoutes } from '@tg/ui-kit/utils';

import { styles } from '../../../styles/routes/Auth/Auth';

type Props = {
	route: RouteConfig & { render?: any };
};

/**
 * Authentication container
 */
const Auth: React.SFC<Props> = ({ route }) => (
	<main className={ styles.self }>
		{ renderRoutes(route.routes) }
	</main>
);

export default Auth;
