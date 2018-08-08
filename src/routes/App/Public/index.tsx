/**
 * Public application part container (home, F.A.Q. etc)
 */
import React from 'react';
import { RouteConfig } from 'react-router-config';

import { renderRoutes } from '@tg/ui/utils';

import { PublicHeader, PublicFooter } from '../../../components';

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

			{/* Header */}
			<PublicHeader />

			{/* Content */}
			{ renderRoutes(route.routes) }

			{/* Footer */}
			<PublicFooter />

		</div>
	);
};

export default Container;
