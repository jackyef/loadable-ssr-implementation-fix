import React from 'react';
import { Router } from 'react-router-dom';
import { createBrowserHistory } from 'history';

import { canUseDOM } from '@prostpost/utils';

export const history = canUseDOM() ? createBrowserHistory({ basename: '' }) : null;

const RouterDecorator = (storyFn: any) => (
	<Router history={ history }>
		{ storyFn() }
	</Router>
);

export default RouterDecorator;
