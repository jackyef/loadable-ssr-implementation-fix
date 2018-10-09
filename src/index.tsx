import React from 'react';
import ReactDOM from 'react-dom';
import { Router } from 'react-router-dom';
import Loadable from 'react-loadable';
import { YMInitializer } from 'react-yandex-metrika';

import { appContainerHTMLTag } from './config';
import Routes, { history } from './routes';

import { renderRoutes } from '@tg/ui/utils';

Loadable.preloadReady().then(() => {
	ReactDOM.hydrate(
		<>

			{/* Yandex Metrika */}
			{
				process.env['YANDEX_METRIKA_ACCOUNT']
					? <YMInitializer accounts={[parseInt(process.env['YANDEX_METRIKA_ACCOUNT'], 10)]} options={{defer: true}} />
					: null
			}

			{/* App */}
			<Router history={ history }>
				{ renderRoutes(Routes) }
			</Router>
		</>,
		document.getElementById(appContainerHTMLTag)
	);
});
