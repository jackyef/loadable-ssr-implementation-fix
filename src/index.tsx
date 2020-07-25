import _ from 'lodash';
import React from 'react';
import ReactDOM from 'react-dom';
import { Router } from 'react-router-dom';
import { loadableReady } from '@loadable/component';
import 'mobx-react-lite/batchingForReactDom';

import { renderRoutes } from './renderer';
import Routes, { history } from './routes';

// Render
loadableReady(() => {
	ReactDOM.hydrate(
		<Router history={ history }>
			{ renderRoutes(Routes) }
		</Router>,
		document.getElementById('app')
	)
}).catch(_.constant);
