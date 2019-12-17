import fs from 'fs';
import path from 'path';
import express, { Request, Response } from 'express';
import { matchRoutes } from 'react-router-config';
import Loadable from 'react-loadable';
import { useStaticRendering } from 'mobx-react';

// SSR renderer function
import { renderer } from '@tg/ui';

// Routes
import { indexRoute } from './config';
import Routes from './routes';

// Get bundle json maps
const loadableJson = require('../bundle_client/react-loadable.json');
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
app.get(`*`, (req: Request, res: Response) => {
	const store = {};

	const promises = matchRoutes(Routes as any, req.path).map(({ route }: any) => {
		return route.loadData ? route.loadData(store) : null;
	});

	Promise.all(promises).then(() => {
		const context: any = {};
		const content = renderer({ req, store, context },
			Routes,
			loadableJson,
			assetsJson,
			{
				indexRoute,
				initialState: null,
				SENTRY_DSN: process.env.SENTRY_DSN
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
		console.log(`Listening on port ${ EXPRESS_SSR_PORT }`);
	});
});
