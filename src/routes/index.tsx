import React from 'react';
import { Redirect } from 'react-router';
import Loadable from 'react-loadable';
import { createBrowserHistory } from 'history';
// import ym from 'react-yandex-metrika';

import { canUseDOM } from '@scc/ui-kit';
import { Loading, NotFound } from '@tg/ui';
import { authenticated } from '@tg/ui/utils';

import { authFormStore } from '../stores';
import { routes, indexRoute } from '../config';

// Not Found Route
const RouteNotFound = { component: () => <Redirect to={ `/${ indexRoute }/nf` } /> };

// Browser history
export const history = canUseDOM() ? createBrowserHistory() : null;

// // Subscribe Yandex Metrika to history object
// process.env['YANDEX_METRIKA_ACCOUNT'] && history.listen(location => {
// 	ym('hit', location.pathname);
// });

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
				path: routes.index,
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
					authenticated()
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
			{ component: () => <NotFound to={`/${ indexRoute }`} /> }
		]
	}
];
