import React from 'react';
import { Redirect } from 'react-router';
import { RouteConfig } from 'react-router-config';
import { createBrowserHistory } from 'history';
import loadable from '@loadable/component';

import { routes } from '../config';

const canUseDOM = (): boolean => (
	!!(typeof window !== 'undefined' && window.document && window.document.createElement)
);

// Not Found Route
const RouteNotFoundComponent: React.FC = () => <Redirect to={ routes.index } />;
const RouteNotFound = { component: RouteNotFoundComponent };

// Browser history
export const history = canUseDOM() ? createBrowserHistory({ basename: '' }) : null;

// Routes map
const r: RouteConfig[] = [
	{
		path: routes.index,
		component: loadable(() => import('./App')),

		routes: [
			{
				exact: true,
				path: routes.test1,
				component: loadable(() => import('./App/Test1'))
			},

			{
				exact: true,
				path: routes.test2,
				component: loadable(() => import('./App/Test2'))
			},

			RouteNotFound
		]
	}
];

export default r;
