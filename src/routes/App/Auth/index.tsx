/**
 * Auth route
 */
import _ from 'lodash';
import React from 'react';
import { RouteConfig } from 'react-router-config';

import { renderRoutes } from '@tg/ui/utils';

import Header from '../../../components/Header';
import Footer from '../../../components/Footer';

import { styles } from '../../../styles/routes/Auth';

type Props = {
	route: RouteConfig & { render?: any };
	location: any; // TODO: Provide a correct type
};

/**
 * Authentication container
 */
const Auth: React.SFC<Props> = ({ route, location }) => {

	// Get path that we currently on to pass to a Header component
	// - in - Create new account (button)
	// - up - Log in (button)
	const path = _.last(location.pathname.split('/')) === 'up' ? 'up' : 'in';

	return (
		<>
			{/* Header */}
			<Header auth={ path } />

			{/* Content */}
			<main className={ styles.self }>
				{ renderRoutes(route.routes) }
			</main>

			{/* Footer */}
			<Footer auth />
		</>
	);
};

export default Auth;
