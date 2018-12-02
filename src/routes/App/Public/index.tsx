/**
 * Public application part container (home, F.A.Q. etc)
 */
import React from 'react';
import { RouteConfig } from 'react-router-config';

import { Header } from '@tg/ui';
import { renderRoutes } from '@tg/ui/utils';

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

			<Header history={ history } nav={ headerNav } />

			{/* Content */}
			{ renderRoutes(route.routes) }

		</div>
	);
};

export default Container;
