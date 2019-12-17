/**
 * Public application part container (home, F.A.Q. etc)
 */
import React from 'react';
import { RouteConfig } from 'react-router-config';

import { renderRoutes } from '@scc/utils';
import { Scrollbars } from '@tg/ui';

// Components
import { Footer } from '../../../components';

type Props = {
	route: RouteConfig & { render?: any };
};

/**
 * Public container
 */
const Container: React.FC<Props> = ({ route }) => {
	return (
		<Scrollbars getScroller>
		{
			(scroller: any) => {
				return (
					<>

						{/* Content */}
						{ renderRoutes(route.routes, { scroller }) }

						{/* Footer */}
						<Footer />
					</>
				);
			}
		}
		</Scrollbars>
	);
};

export default Container;
