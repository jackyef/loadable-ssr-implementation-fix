import React from 'react';
import { Redirect } from 'react-router';
import Loadable from 'react-loadable';
import { createBrowserHistory } from 'history';

import { canUseDOM } from '@tg/utils';

import { LoadingRoute, Flex, theme } from '@tg/elm';

import { routes } from 'app/config';

// Not Found Route
const RouteNotFound = { component: () => <Redirect to={ routes.index } /> };

// Browser history
export const history = canUseDOM() ? createBrowserHistory({ basename: '' }) : null;

// Loaders
const LoaderSubRoute: React.FC<any> = (props: any) => (
	<Flex justify="center" height="100vh">
		<LoadingRoute { ...props }
			height="100vh"
			size="mid"
			theme={ theme }
		/>
	</Flex>
);

// Routes map
export default [
	{
		path: routes.index,
		component: Loadable({
			loader: () => import('./App'),
			loading: LoaderSubRoute
		}),

		routes: [

			// Root
			{
				exact: true,
				path: routes.index,
				component: Loadable({
					loader: () => import('./App/Public'),
					loading: LoaderSubRoute
				}),

				// Landing
				routes: [
					{
						exact: true,
						path: routes.index,
						component: Loadable({
							loader: () => import('./App/Public/Landing'),
							loading: LoaderSubRoute
						})
					}
				]
			},

			// Terms and Conditions & Privacy Policy
			{
				path: routes.pp,
				component: Loadable({
					loader: () => import('./App/PP'),
					loading: LoaderSubRoute
				})
			},

			// Auth
			{
				path: routes.auth.self,
				component: Loadable({
					loader: () => import('./App/Auth'),
					loading: LoaderSubRoute
				}),

				routes: [

					// Root
					{
						component: () => <Redirect to={ routes.auth.signin } />,
						path: routes.auth.self,
						exact: true
					},

					// Sign Up
					{
						path: routes.auth.signup,
						component: Loadable({
							loader: () => import('./App/Auth/Signup'),
							loading: LoaderSubRoute
						})
					},

					// Sign In
					{
						exact: true,
						path: routes.auth.signin,
						component: Loadable({
							loader: () => import('./App/Auth/Signin'),
							loading: LoaderSubRoute
						})
					},

					// Reset password
					{
						exact: true,
						path: routes.auth.reset,
						component: Loadable({
							loader: () => import('./App/Auth/Reset'),
							loading: LoaderSubRoute
						})
					},

					// New password
					{
						exact: true,
						path: routes.auth.password,
						component: Loadable({
							loader: () => import('./App/Auth/NewPassword'),
							loading: LoaderSubRoute
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
