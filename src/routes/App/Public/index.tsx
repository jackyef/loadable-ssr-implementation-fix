/**
 * Public application part container (home, F.A.Q. etc)
 */
import React from 'react';
import { RouteConfig } from 'react-router-config';

import { renderRoutes } from '@scc/utils';
import { Scrollbars } from '@tg/ui';

// Components
import { Footer } from '../../../components';

// Styles
import importedStyles from './Public.module.less';
const styles: Styles = importedStyles;

type Styles = {
	self?: string;
};

type Props = {
	route: RouteConfig & { render?: any };
};

/**
 * Public container
 */
const Container: React.FC<Props> = ({ route }) => {
	return (
		<Scrollbars getScroller styles={{ wrapper: styles.self }}>
			{
				(scroller: any) => (<>

					{/* Content */}
					{ renderRoutes(route.routes, { scroller }) }

					{/* Footer */}
					<Footer />
				</>)
			}
		</Scrollbars>
	);
};

export default Container;
