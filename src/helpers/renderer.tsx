import React from 'react';
import fs from 'fs';
import path from 'path';
import { Helmet } from 'react-helmet';
import { Request } from 'express';
import { renderToString } from 'react-dom/server';
import { StaticRouter } from 'react-router-dom';
import serialize from 'serialize-javascript';

import Loadable from 'react-loadable';
import { getBundles } from 'react-loadable/webpack';
const stats = require('../../bundle_client/react-loadable.json');

import Routes from '../routes';
import renderRoutes from '../helpers/utils/renderRoutes';

export default (req: Request, store: any, context: any) => {

	const modules: string[] = [];

	// Render route
	const content = renderToString(
		<Loadable.Capture report={ (moduleName: string) => modules.push(moduleName) }>
			<StaticRouter location={ req.path } context={ context }>
				{ renderRoutes(Routes) }
			</StaticRouter>
		</Loadable.Capture>
	);

	// Loaded bundles
	const bundles = getBundles(stats, modules);

	// Helmet
	const helmet = Helmet.renderStatic();

	const assets = JSON.parse(fs.readFileSync(path.join(__dirname, '..', 'bundle_client', 'assets.json'), 'utf-8'));

	// Template
	return `
		<html>
			<head>
				${ helmet.title.toString() }
				${ helmet.meta.toString() }
				<link rel="stylesheet" href="${ assets.app.css }" />
				<link rel="favicon" href="/static/images/favicon.png" />
				<link rel="manifest" href="/static/manifest.json" />
				${
					bundles.map((bundle: any, index: number) => {
						const splitted = bundle.file.split('.');
						return splitted[splitted.length - 1] === 'css' ? `<link rel="stylesheet" href="/static/${ bundle.file }" />` : '';
					}).join('\n')
				}
			</head>
			<body>
				<div id="app">${ content }</div>
				<div id="modal-portal"></div>

				<script src="https://cdn.ravenjs.com/3.24.0/raven.min.js" crossorigin="anonymous"></script>
				<script> Raven.config(${ process.env.SENTRY_DSN }).install() </script>
				<script> window.INITIAL_STATE = ${ serialize({}) } </script>

				<script src="${ assets.vendor.js }"></script>
				<script src="${ assets.app.js }"></script>
				${
					bundles.map((bundle: any, index: number) => {
						const splitted = bundle.file.split('.');
						return splitted[splitted.length - 1] === 'js' ? `<script src="/static/${ bundle.file }"></script>` : '';
					}).join('\n')
				}
			</body>
		</html>
	`;
};
