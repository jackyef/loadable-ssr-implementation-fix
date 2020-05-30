/**
 * Auth route
 */
import _ from 'lodash';
import React, { useEffect } from 'react';
import { Location } from 'history';
import { RouteConfig } from 'react-router-config';

import { renderRoutes, canUseDOM, jwtExpired } from '@tg/utils';
import { Button, Text } from '@tg/elm';

import { history } from 'app/routes';
import { routes } from 'app/config';
import { Header, Nav } from 'app/components';

import { StyledLogo } from '../Public/Landing/_styled';
import {
	StyledMain,
	StyledNavItem,
	StyledVh
} from './_styled';

type Props = {
	route: RouteConfig;
	location: Location;
};

const Auth: React.FC<Props> = ({ route }) => {

	// Get path that we currently on to pass to a Header component
	// - in - Create new account (button)
	// - up - Log in (button)
	const path = canUseDOM() && _.last(_.split(location.pathname, '/')) === 'up' ? 'up' : 'in';

	// Mount
	useEffect(() => {
		if (canUseDOM() && !jwtExpired(localStorage.getItem('id_token'))) {
			window.location.assign(routes.poster);
		}
	}, []);

	// Render
	return (
		<StyledVh>

			{/* Header */}
			<Header>

				{/* Logo */}
				<StyledLogo onClick={ () => history.push(routes.home) } />

				{/* Sign in/up */}
				<Nav>
					<StyledNavItem>
						<Text size={ 13 } mr={ 4 } color="blue_30">
							{ path === 'in' ? 'Don’t have an account?' : 'Already have an account?' }
						</Text>
						<Button nav variant="nav"
							title={ path === 'in' ? 'Create account' : 'Sign in' }
							onClick={ () => path === 'in' ? routes.auth.signup : routes.auth.signin }
						/>
					</StyledNavItem>
				</Nav>
			</Header>

			{/* Content */}
			<StyledMain>
				{ renderRoutes(route.routes) }
			</StyledMain>

		</StyledVh>
	);
};

export default Auth;
