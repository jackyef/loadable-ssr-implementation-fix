/**
 * Auth route
 */
import _ from 'lodash';
import React from 'react';
import { RouteConfig } from 'react-router-config';

import { renderRoutes } from '@tg/ui/utils';

import { PublicHeader, PublicFooter } from '../../../components';

const styles: Styles = require('./Auth.module.less');

export type Styles = {
	self?: any;
	form?: any;
	google?: any;
	field?: any; // theme
	field_focus?: any; // theme__focus
	field_error?: any; // theme__error
	submit?: any;
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
			<PublicHeader auth={ path } />

			{/* Content */}
			<main className={ styles.self }>
				{ renderRoutes(route.routes) }
			</main>

			{/* Footer */}
			<PublicFooter />
		</>
	);
};

export default Auth;
