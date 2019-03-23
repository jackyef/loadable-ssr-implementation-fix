/**
 * Auth route
 */
import _ from 'lodash';
import React from 'react';
import { RouteConfig } from 'react-router-config';

import { PublicHeader } from '@tg/ui';
import { resources } from '@tg/ui/resources';
import { renderRoutes } from '@scc/utils';

import { authHeaderNav } from '../../../config';
import { history } from '../../';

const styles: Styles = require('./Auth.module.less');

export type Styles = {
	self?: string;
	form?: string;
	header?: string;
	google?: string;
	field?: string;
	submit?: string;
};

type Props = {
	route: RouteConfig & { render?: any };
	location: any; // TODO: Provide a correct type
};

/**
 * Authentication container
 */
const Auth: React.FC<Props> = ({ route, location }) => {

	// Get path that we currently on to pass to a Header component
	// - in - Create new account (button)
	// - up - Log in (button)
	const path = _.last(location.pathname.split('/')) === 'up' ? 'up' : 'in';

	return (
		<>
			{/* Header */}
			<PublicHeader history={ history } nav={ authHeaderNav(path) } styles={ styles.header } />

			{/* Content */}
			<main className={ styles.self }>
				<img src={ resources.bg_pattern_dots } />
				<img src={ resources.bg_pattern_dots } />
				{ renderRoutes(route.routes) }
			</main>
		</>
	);
};

export default Auth;
