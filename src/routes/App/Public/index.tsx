/**
 * Public application part container (home, F.A.Q. etc)
 */
import React from 'react';
import { RouteConfig } from 'react-router-config';

import { PublicHeader } from '@tg/ui';
import { renderRoutes } from '@scc/utils';

import { headerNav } from '../../../config';
import { history } from '../../';

const styles: Styles = require('./Public.module.less');

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

			<PublicHeader history={ history } nav={ headerNav } />

			{/* Content */}
			{ renderRoutes(route.routes) }

		</div>
	);
};

export default Container;
