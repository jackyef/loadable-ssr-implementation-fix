import _ from 'lodash';
import React from 'react';
import ReactDOM from 'react-dom';
import { Router } from 'react-router-dom';
import { loadableReady } from '@loadable/component';
import 'mobx-react-lite/batchingForReactDom';

import { renderRoutes } from '@prostpost/utils';

import { appContainerHTMLTag } from './config';
import Routes, { history } from './routes';

/**
 * Set document height for mobiles
 */
export const appHeight = (): void => {
	const doc = document.documentElement;
	doc.style.setProperty('--app-height', `${ window.innerHeight }px`);
};

// Mobile height
window.addEventListener('resize', appHeight);
window.addEventListener('orientationchange', appHeight);
appHeight();

// Render
loadableReady(() => {
	ReactDOM.hydrate(
		<Router history={ history }>
			{ renderRoutes(Routes) }
		</Router>,
		document.getElementById(appContainerHTMLTag)
	)
}).catch(_.constant);
