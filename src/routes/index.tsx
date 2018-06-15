import React from 'react';
import { Redirect } from 'react-router';
import Loadable from 'react-loadable';
import { createBrowserHistory } from 'history';

import { canUseDOM } from '@scc/scc-ui-kit';
import { Loading, NotFoundRoute as NotFound } from '@tg/ui';
import { authenticated } from '@tg/ui/utils';

import { authFormStore } from '../stores';
import { routes } from '../config';

// Not Found Route
const RouteNotFound = { component: () => <Redirect to={ '/p/nf' } /> };

// Browser history
export const history = canUseDOM() ? createBrowserHistory() : null;

// List of loadable routes with authentication condition
const LoadableAuth = Loadable({ loader: () => import('./App/Auth'), loading: Loading });

// Routes map
export default [
	{
		path: routes.index,
		component: Loadable({
			loader: () => import('./App'),
			loading: Loading
		}),

		routes: [

			// Root
			{
				component: () => <Redirect to={ routes.home } />,
				path: routes.auth.self,
				exact: true
			},

			// Public
			{
				path: routes.home,
				component: Loadable({
					loader: () => import('./App/Public'),
					loading: Loading
				}),

				routes: [

					// Landing (home)
					{
						exact: true,
						path: routes.home,
						component: Loadable({
							loader: () => import('./App/Public/Landing'),
							loading: Loading
						})
					}
				]
			},

			// Auth
			{
				path: routes.auth.self,
				render: (props: any) => (
					authenticated() === 'ok'
						? <Redirect to={ routes.home } />
						: <LoadableAuth { ...props } />
				),

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
							loading: Loading,
							render(loaded: any, props: any) {
								const Component = loaded.default;
								return <Component { ...props } store={ authFormStore } />;
							}
						})
					},

					// Sign In
					{
						exact: true,
						path: routes.auth.signin,
						component: Loadable({
							loader: () => import('./App/Auth/Signin'),
							loading: Loading,
							render(loaded: any, props: any) {
								const Component = loaded.default;
								return <Component store={ authFormStore } />;
							}
						})
					},

					// Not Found (404)
					{ ...RouteNotFound }
				]
			},

			// Not Found (404)
			{ ...NotFound }
		]
	}
];
