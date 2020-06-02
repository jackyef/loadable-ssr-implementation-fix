import React from 'react';
import { Redirect } from 'react-router';
import { RouteConfig } from 'react-router-config';
import { createBrowserHistory } from 'history';
import loadable from '@loadable/component';

import { canUseDOM } from '@tg/utils';

import { Loading, Flex, theme } from '@tg/elm';

import { routes } from 'app/config';

// Not Found Route
const RouteNotFoundComponent: React.FC = () => <Redirect to={ routes.index } />;
const RouteNotFound = { component: RouteNotFoundComponent };

// Redirect to sign in
const RouteRedirectSignInComponent = (): React.ReactElement => <Redirect to={ routes.auth.signin } />;

// Browser history
export const history = canUseDOM() ? createBrowserHistory({ basename: '' }) : null;

// Loaders
const LoaderSubRoute = (
	<Flex justify="center" height="100vh">
		<Loading
			height="100vh"
			size="mid"
			theme={ theme }
		/>
	</Flex>
);

// Routes map
const r: RouteConfig[] = [
	{
		path: routes.index,
		component: loadable(() => import('./App'), {
			fallback: LoaderSubRoute
		}),

		routes: [

			// Root
			{
				exact: true,
				path: routes.index,
				component: loadable(() => import('./App/Public'), {
					fallback: LoaderSubRoute
				}),

				// Landing
				routes: [
					{
						exact: true,
						path: routes.index,
						component: loadable(() => import('./App/Public/Landing'), {
							fallback: LoaderSubRoute
						})
					}
				]
			},

			// Terms and Conditions & Privacy Policy
			{
				path: routes.pp,
				component: loadable(() => import('./App/PP'), {
					fallback: LoaderSubRoute
				})
			},

			// Auth
			{
				path: routes.auth.self,
				component: loadable(() => import('./App/Auth'), {
					fallback: LoaderSubRoute
				}),

				routes: [

					// Root
					{
						component: RouteRedirectSignInComponent,
						path: routes.auth.self,
						exact: true
					},

					// Sign Up
					{
						path: routes.auth.signup,
						component: loadable(() => import('./App/Auth/pages/Signup'), {
							fallback: LoaderSubRoute
						})
					},

					// Sign In
					{
						exact: true,
						path: routes.auth.signin,
						component: loadable(() => import('./App/Auth/pages/Signin'), {
							fallback: LoaderSubRoute
						})
					},

					// Reset password
					{
						exact: true,
						path: routes.auth.reset,
						component: loadable(() => import('./App/Auth/pages/Reset'), {
							fallback: LoaderSubRoute
						})
					},

					// New password
					{
						exact: true,
						path: routes.auth.password,
						component: loadable(() => import('./App/Auth/pages/NewPassword'), {
							fallback: LoaderSubRoute
						})
					},

					// Not Found (404)
					{ ...RouteNotFound }
				]
			},

			// Not Found (404)
			RouteNotFound
		]
	}
];

export default r;
