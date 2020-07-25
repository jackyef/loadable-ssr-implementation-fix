import React from 'react';
import { RouteConfig } from 'react-router-config';
import { ThemeProvider } from 'styled-components';

import { renderRoutes } from '../../renderer';

type Props = {
	route: RouteConfig;
};

const Container: React.FC<Props> = ({ route }) => {
	return (
		<ThemeProvider theme={{}}>
			{ renderRoutes(route.routes) }
		</ThemeProvider>
	);
};

export default Container;
