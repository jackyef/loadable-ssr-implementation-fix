/**
 * Public application part container (home, F.A.Q. etc)
 */
import React from 'react';
import { RouteConfig } from 'react-router-config';

import { renderRoutes } from '@tg/ui/utils';

import { Header } from '../../../components';

import { headerNav } from '../../../config';

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
const Container: React.SFC<Props> = ({ route }) => {
	return (
		<div className={ styles.self }>

			<Header nav={ headerNav } />

			{/* Content */}
			{ renderRoutes(route.routes) }

		</div>
	);
};

export default Container;
