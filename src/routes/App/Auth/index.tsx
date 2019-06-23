/**
 * Auth route
 */
import _ from 'lodash';
import React from 'react';
import { RouteConfig } from 'react-router-config';

import { renderRoutes } from '@scc/utils';

import importedStyles from './Auth.module.less';
const styles: Styles = importedStyles;

export type Styles = {
	self?: string;
	form?: string;
};

type Props = {
	route: RouteConfig & { render?: any };
	location: any; // TODO: Provide a correct type
};

/**
 * Authentication container
 */
const Auth: React.FC<Props> = ({ route }) => {

	// Get path that we currently on to pass to a Header component
	// - in - Create new account (button)
	// - up - Log in (button)
	// const path = _.last(location.pathname.split('/')) === 'up' ? 'up' : 'in';

	return (
		<>
			{/* Header */}
			{/* TODO: Add auth routes specific header here */}

			{/* Content */}
			<main className={ styles.self }>
				{ renderRoutes(route.routes) }
			</main>
		</>
	);
};

export default Auth;
