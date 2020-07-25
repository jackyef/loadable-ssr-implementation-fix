/* eslint-disable */
// @ts-nocheck
import winston from 'winston';
import express, { Response, Request } from 'express';
import { matchRoutes, RouteConfig } from 'react-router-config';
import { useStaticRendering } from 'mobx-react';

import { renderer } from './renderer';
import { indexRoute } from './config';
import Routes from './routes';

const logger = winston.createLogger({
	transports: [new (winston.transports.Console)()]
});

// Get bundle json maps
// eslint-disable-next-line import/no-internal-modules
// eslint-disable-next-line @typescript-eslint/no-var-requires
const loadableJson = require('../bundle_client/loadable-stats.json');

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
			{
				indexRoute,
				initialState: data,
				SENTRY_DSN: process.env.SENTRY_DSN,
				GOOGLE_ANALYTICS_ID: process.env.GOOGLE_ANALYTICS_ID
			}
		);

		if (context.notFound) { res.status(404); }

		res.send(content);
	}).catch(e => console.warn(e));
});

app.listen(EXPRESS_SSR_PORT, () => {
	logger.info(`Listening on port ${ EXPRESS_SSR_PORT }`);
});
