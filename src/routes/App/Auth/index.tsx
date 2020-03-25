/**
 * Auth route
 */
import _ from 'lodash';
import React, { useEffect } from 'react';
import { RouteConfig } from 'react-router-config';

import { renderRoutes, canUseDOM, jwtExpired } from '@tg/utils';
import { Btn, Logo } from '@tg/elm';

import { history } from '../../';
import { routes } from '../../../config';
import { Header, Nav, NavItem } from '../../../components';

// Styles
// eslint-disable-next-line import/no-internal-modules
import importedLandingStyles from '../Public/Landing/Landing.module.less';
const stylesLanding: Styles = importedLandingStyles;

import importedStyles from './Auth.module.less';
const styles: Styles = importedStyles;

export type Styles = {
	self?: string;
	form?: string;
	pp?: string;
	vh?: string;
	nav_item?: string;

	// From public
	logo?: string;
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
	const path = canUseDOM() && _.last(location.pathname.split('/')) === 'up' ? 'up' : 'in';

	// Mount
	useEffect(() => {
		if (canUseDOM() && !jwtExpired(localStorage.getItem('id_token'))) {
			window.location.assign(routes.poster);
		}
	}, []);

	// Render
	return (
		<div className={ styles.vh }>

			{/* Header */}
			<Header>

				{/* Logo */}
				<Logo className={ stylesLanding.logo } onClick={ () => history.push(routes.home) } />

				{/* Sign in/up */}
				<Nav>
					<NavItem className={ styles.nav_item }>
						<span>{ path === 'in' ? 'Don’t have an account?' : 'Already have an account?' }</span>
						<Btn nav
							kind={ { variant: 'nav' } }
							title={ path === 'in' ? 'Create account' : 'Sign in' }
							onClick={ () => path === 'in' ? routes.auth.signup : routes.auth.signin }
						/>
					</NavItem>
				</Nav>
			</Header>

			{/* Content */}
			<main className={ styles.self }>
				{ renderRoutes(route.routes) }
			</main>

		</div>
	);
};

export default Auth;
