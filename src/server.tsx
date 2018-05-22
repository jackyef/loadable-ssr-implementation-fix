import express, { Request, Response } from 'express';
import { matchRoutes } from 'react-router-config';
import Loadable from 'react-loadable';

import renderer from './helpers/renderer';
import Routes from './routes';

// Port
const EXPRESS_SSR_PORT = process.env.EXPRESS_SSR_PORT || 3000;

// Create express app
const app = express();

// Static
app.use('/static', express.static('bundle_client'));

app.get('/', (req: Request, res: Response) => {
	res.redirect('/app/auth');
});

// Location
app.get('/app/*', (req: Request, res: Response) => {
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
