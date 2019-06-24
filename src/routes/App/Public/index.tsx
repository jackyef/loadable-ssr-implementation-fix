/**
 * Public application part container (home, F.A.Q. etc)
 */
import React from 'react';
import { RouteConfig } from 'react-router-config';

import { renderRoutes } from '@scc/utils';

import importedStyles from './Public.module.less';
const styles: Styles = importedStyles;

type Styles = {
	self?: any;
};

type Props = {
	route: RouteConfig & { render?: any };
};

/**
 * Public container
 */
const Container: React.FC<Props> = ({ route }) => {
	return (
		<div className={ styles.self }>
			{/* TODO: Add common header here */}
			{ 'Public' }
			{ renderRoutes(route.routes) }
		</div>
	);
};

export default Container;
