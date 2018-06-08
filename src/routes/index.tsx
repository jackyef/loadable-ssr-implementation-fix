import React from 'react';
import { Redirect } from 'react-router';
import Loadable from 'react-loadable';
import { createBrowserHistory } from 'history';

import { canUseDOM } from '@scc/scc-ui-kit';
import { Loading, NotFoundRoute as NotFound } from '@tg/ui';
import { authenticated } from '@tg/ui/utils';

import { authFormStore } from '../stores';
import { routes } from '../config';

// Routes
import Email from './App/Auth/Signup/Email';
import Phone from './App/Auth/Signup/Phone';

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
						: authenticated() === 'nophone'
							? <Redirect to={ routes.phone } />
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
						path: routes.auth.signup.self,
						component: Loadable({
							loader: () => import('./App/Auth/Signup'),
							loading: Loading,
							render(loaded: any, props: any) {
								const Component = loaded.default;
								return <Component { ...props } store={ authFormStore } />;
							}
						}),

						routes: [

							// Root
							{
								component: () => <Redirect to={ routes.auth.signup.email } />,
								path: routes.auth.signup.self,
								exact: true
							},

							// Email (socials)
							{
								path: routes.auth.signup.email,
								exact: true,
								component: Email
							},

							// Phone (link TG account)
							{
								path: routes.auth.signup.phone,
								exact: true,
								component: Phone
							}
						]
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
					}
				]
			},

			// Register phone
			// This component repeats Auth -> Signup -> Phone routes chain
			// but has different authentication condition and no inner paths.
			// It's more comfortable to duplicate this part of code here then
			// to ajust authentication conditions to the existing Auth routes section
			{

				path: routes.phone,
				render: (props: any) => (
					authenticated() !== 'nophone'
						? <Redirect to={ routes.home } />
						: <LoadableAuth { ...props } />
				),

				routes: [
					{
						component: Loadable({
							loader: () => import('./App/Auth/Signup'),
							loading: Loading,
							render(loaded: any, props: any) {
								const Component = loaded.default;
								return <Component { ...props } store={ authFormStore } />;
							}
						}),

						routes: [
							{
								component: Loadable({
									loader: () => import('./App/Auth/Signup/Phone'),
									loading: Loading
								})
							}
						]
					}
				]
			},

			// Not Found (404)
			{ ...NotFound }
		]
	}
];
