/**
 * Auth route
 */
import _ from 'lodash';
import React from 'react';
import { RouteConfig } from 'react-router-config';

import { renderRoutes } from '@scc/utils';

import { Btn } from '@tg/ui';

import { history } from '../../';
import { routes } from '../../../config';
import { Header, Logo, Nav, NavItem } from '../../../components';

// Styles
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
	const path = _.last(location.pathname.split('/')) === 'up' ? 'up' : 'in';

	return (
		<>
			{/* Header */}
			<Header>

				{/* Logo */}
				<Logo onClick={() => history.push(routes.home)} />

				{/* Sign in/up (logout) */}
				<Nav>
					<NavItem>
						<Btn style={{ main: 'nav' }} title={ path === 'in' ? 'Create account' : 'Sign In' }
							url={ path === 'in' ? routes.auth.signup : routes.auth.signin }
						/>
					</NavItem>
				</Nav>
			</Header>

			{/* Content */}
			<main className={ styles.self }>
				{ renderRoutes(route.routes) }
			</main>

			{/* Footer */}
			{/* TODO: Footer component here */}
		</>
	);
};

export default Auth;
