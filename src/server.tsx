import express, { Request, Response } from 'express';
import { matchRoutes } from 'react-router-config';
import Loadable from 'react-loadable';
import { useStaticRendering } from 'mobx-react';

import { indexRoute } from './config';
import renderer from './helpers/renderer';
import Routes from './routes';

useStaticRendering(true);

// Port
const EXPRESS_SSR_PORT = process.env.EXPRESS_SSR_PORT || 3000;

// Create express app
const app = express();

// Healthcheck
app.get('/healthz', (req, res) => {
	res.status(200).send('Healthy');
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
		const content = renderer(req, store, context);

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
