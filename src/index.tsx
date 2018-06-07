import React from 'react';
import ReactDOM from 'react-dom';
import { Router } from 'react-router-dom';
import Loadable from 'react-loadable';

import { appContainerHTMLTag } from './config';
import Routes, { history } from './routes';

import { renderRoutes } from '@tg/ui-kit/utils';

Loadable.preloadReady().then(() => {
	ReactDOM.hydrate(
		<Router history={ history }>
			{ renderRoutes(Routes) }
		</Router>,
		document.getElementById(appContainerHTMLTag)
	);
});
