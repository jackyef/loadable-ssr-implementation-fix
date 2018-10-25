/**
 * Auth route
 */
import _ from 'lodash';
import React from 'react';
import { RouteConfig } from 'react-router-config';

import { Header } from '@tg/ui';
import { resources } from '@tg/ui/res';
import { renderRoutes } from '@tg/ui/utils';

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
const Auth: React.SFC<Props> = ({ route, location }) => {

	// Get path that we currently on to pass to a Header component
	// - in - Create new account (button)
	// - up - Log in (button)
	const path = _.last(location.pathname.split('/')) === 'up' ? 'up' : 'in';

	return (
		<>
			{/* Header */}
			<Header history={ history } nav={ authHeaderNav(path) } styles={ styles.header } />

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
