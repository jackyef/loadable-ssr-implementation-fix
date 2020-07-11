/**
 * Public application part container (home, F.A.Q. etc)
 */
import React from 'react';
import { RouteConfig } from 'react-router-config';
import { Scrollbar } from 'react-scrollbars-custom';

import { renderRoutes } from '@prostpost/utils';
import { Scrollbars } from '@prostpost/elm';

import { Footer } from 'app/components';

type Props = {
	route: RouteConfig;
};

const Container: React.FC<Props> = ({ route }) => {
	return (
		<Scrollbars getScroller position="absolute">
		{
			(scroller: Scrollbar) => {
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
