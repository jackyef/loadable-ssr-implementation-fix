import React from 'react';
import { Redirect } from 'react-router';
import Loadable from 'react-loadable';
import { createBrowserHistory } from 'history';

import { Loading } from '@tg/ui';
import { canUseDOM } from '@scc/utils';

import { routes } from '../config';

// Styles
import importedStyles from './Routes.module.less';
const styles: Styles = importedStyles;

type Styles = {
	loading?: string;
};

// Not Found Route
const RouteNotFound = { component: () => <Redirect to={ routes.index } /> };

// Browser history
export const history = canUseDOM() ? createBrowserHistory({ basename: '' }) : null;

// Loaders
const LoaderSubRoute = (props: any) => <Loading {...props} className={styles.loading} />;

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
					loader: () => import('./App/Public/Landing'),
					loading: LoaderSubRoute
				})
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
