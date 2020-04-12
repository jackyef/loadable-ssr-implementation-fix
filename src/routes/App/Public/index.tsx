/**
 * Public application part container (home, F.A.Q. etc)
 */
import React from 'react';
import { RouteConfig } from 'react-router-config';

import { renderRoutes } from '@tg/utils';
import { Scrollbars } from '@tg/elm';

import { Footer } from 'app/components';

type Props = {
	route: RouteConfig & { render?: any };
};

/**
 * Public container
 */
const Container: React.FC<Props> = ({ route }) => {
	return (
		<Scrollbars getScroller position="absolute">
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
