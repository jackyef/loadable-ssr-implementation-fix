/**
 * Auth route
 */
import _ from 'lodash';
import React, { useEffect } from 'react';
import { RouteConfig } from 'react-router-config';
import Cookies from 'js-cookie';

import { renderRoutes } from '@scc/utils';

import {Btn, expired} from '@tg/ui';

import { history } from '../../';
import { routes } from '../../../config';
import { Header, Logo, Nav, NavItem } from '../../../components';

// Styles
import importedStyles from './Auth.module.less';
const styles: Styles = importedStyles;

export type Styles = {
	self?: string;
	form?: string;
	pp?: string;
	nav_item?: string;
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

	// Mount
	useEffect(() => {
		if (!expired(Cookies.get('access_token'))) {
			window.location.assign(routes.poster);
		}
	}, []);

	// Render
	return (
		<>
			{/* Header */}
			<Header>

				{/* Logo */}
				<Logo onClick={() => history.push(routes.home)} />

				{/* Sign in/up */}
				<Nav>
					<NavItem className={ styles.nav_item }>
						<span>{ path === 'in' ? 'Don’t have an account?' : 'Already have an account?' }</span>
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
		</>
	);
};

export default Auth;
