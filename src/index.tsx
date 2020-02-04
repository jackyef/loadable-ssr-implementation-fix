import _ from 'lodash';
import React from 'react';
import ReactDOM from 'react-dom';
import { Router } from 'react-router-dom';
import Loadable from 'react-loadable';

import { renderRoutes } from '@tg/utils';

import { appContainerHTMLTag } from './config';
import Routes, { history } from './routes';
import { appHeight } from './utils';

// Mobile height
window.addEventListener('resize', appHeight);
window.addEventListener('orientationchange', appHeight);
appHeight();

// Render
Loadable.preloadReady().then(() => {
	ReactDOM.hydrate(
		<Router history={ history }>
			{ renderRoutes(Routes) }
		</Router>,
		document.getElementById(appContainerHTMLTag)
	);
	return null;
}).catch(_.constant);
