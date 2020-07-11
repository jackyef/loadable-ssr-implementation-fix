/* eslint-disable */
// @ts-nocheck
import fs from 'fs';
import path from 'path';
import express, { Response, Request } from 'express';
import { matchRoutes, RouteConfig } from 'react-router-config';
import Loadable from 'react-loadable';
import { useStaticRendering } from 'mobx-react';

import { renderer } from '@prostpost/elm';

// Routes
import { indexRoute } from './config';
import Routes from './routes';

// Logger
import winston from 'winston';
import { support } from 'fluent-logger';

// Fluent
const fluentConfig = {
	host: 'fluentd-es.logging.svc.cluster.local',
	port: 24224,
	timeout: 3.0,
	requireAckResponse: true // Add this option to wait response from Fluentd certainly
};

// NO TYPES FOR FLUENTD LOGGER
/* eslint @typescript-eslint/no-unsafe-call: 0 */
/* eslint @typescript-eslint/no-unsafe-member-access: 0 */
const fluentTransport = support.winstonTransport();
const fluent = new fluentTransport('service_ssr_public', fluentConfig);

// Logger
const logger = winston.createLogger({
	transports: [fluent, new (winston.transports.Console)()]
});

// Get bundle json maps
// eslint-disable-next-line import/no-internal-modules
// eslint-disable-next-line @typescript-eslint/no-var-requires
const loadableJson = require('../bundle_client/loadable-stats.json');
const assetsJson = JSON.parse(fs.readFileSync(path.join(__dirname, '..', 'bundle_client', 'assets.json'), 'utf-8'));

useStaticRendering(true);

// Port
const EXPRESS_SSR_PORT = process.env.EXPRESS_SSR_PORT || 3000;

// Create express app
const app = express();

// Health check
app.get('/healthz', (req, res) => {
	res.status(200).send('Healthy node');
});

app.get('/readyz', (req, res) => {
	res.status(200).send('Ready node');
});

// Static
app.use(`/static/${ indexRoute }`, express.static('bundle_client'));

// Location
// any -> Request
app.get('*', (req: Request, res: Response) => {

	const promises = matchRoutes(Routes, req.path).map(
		({ route }: RouteConfig) => (
			route.loadData ? route.loadData() : null
		)
	);

	Promise.all(promises).then(data => {
		const context: unknown = {};
		const content = renderer(
			{ req, context },
			Routes,
			loadableJson,
			assetsJson,
			{
				indexRoute,
				initialState: data,
				SENTRY_DSN: process.env.SENTRY_DSN,
				GOOGLE_ANALYTICS_ID: process.env.GOOGLE_ANALYTICS_ID
			}
		);

		if (context.notFound) { res.status(404); }

		res.send(content);
	})

		.catch(e => console.warn(e));
});

// Run server
Loadable.preloadAll().then(() => {
	app.listen(EXPRESS_SSR_PORT, () => {
		logger.info(`Listening on port ${ EXPRESS_SSR_PORT }`);
	});
});
