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

import { renderRoutes } from '@tg/ui/utils';

import { indexRoute } from '../config';
import Routes from '../routes';

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
	const publicPath = `/static/${ indexRoute }`;

	// Template
	return `
		<html>
			<head>
				${ helmet.title.toString() }
				${ helmet.meta.toString() }
				<link href="https://fonts.googleapis.com/css?family=Raleway:900" rel="stylesheet">
				<link rel="stylesheet" href="${ assets.app.css }" />

				<link rel="apple-touch-icon" sizes="180x180" href="${ publicPath }/favicon/apple-touch-icon.png">
				<link rel="icon" type="image/png" sizes="32x32" href="${ publicPath }/favicon/favicon-32x32.png">
				<link rel="icon" type="image/png" sizes="16x16" href="${ publicPath }/favicon/favicon-16x16.png">
				<link rel="manifest" href="${ publicPath }/favicon/site.webmanifest">
				<link rel="mask-icon" href="${ publicPath }/favicon/safari-pinned-tab.svg" color="#2051cb">
				<link rel="shortcut icon" href="${ publicPath }/favicon/favicon.ico">
				<meta name="msapplication-TileColor" content="#2051cb">
				<meta name="msapplication-config" content="${ publicPath }/favicon/browserconfig.xml">
				<meta name="theme-color" content="#ff0000">

				<link rel="manifest" href="${ publicPath }/manifest.json" />
				${
					bundles.map((bundle: any, index: number) => {
						const splitted = bundle.file.split('.');
						return splitted[splitted.length - 1] === 'css'
							? `<link rel="stylesheet" href="${ publicPath }/${ bundle.file }" />`
							: ''
						;
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
						return splitted[splitted.length - 1] === 'js'
							? `<script src="${ publicPath }/${ bundle.file }"></script>`
							: ''
						;
					}).join('\n')
				}
			</body>
		</html>
	`;
};
