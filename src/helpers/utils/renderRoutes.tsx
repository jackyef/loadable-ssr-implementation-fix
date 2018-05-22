import React from 'react';
import { Switch, Route } from 'react-router';

/**
 * Custom renderRoutes function that accepts a render
 * attribute from router configuration
 * @param routes Routes to render
 * @param extraProps Extra props to pass to all routes
 * @param switchProps Switch component props
 */
const renderRoutes = (routes: any, extraProps = {}, switchProps = {}) =>
	routes
	? (
		<Switch {...switchProps}>
			{
				routes.map((route: any, i: number) => (
					<Route key={ route.key || i }
						path={ route.path }
						exact={ route.exact }
						strict={ route.strict }
						render={ props => route.render
							? route.render({ ...props, ...extraProps, route: route })
							: <route.component { ...props } { ...extraProps } route={ route } />
						}
					/>
					)
				)
			}
		</Switch>
	)
	: null
;

export default renderRoutes;
