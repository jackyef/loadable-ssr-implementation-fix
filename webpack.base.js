import path from 'path';
import webpack from 'webpack';

import UglifyWebpackPlugin from 'uglifyjs-webpack-plugin';
import OptimizeCSSAssetsPlugin from 'optimize-css-assets-webpack-plugin';
import { TsConfigPathsPlugin } from 'awesome-typescript-loader';
import CircularDependencyPlugin from 'circular-dependency-plugin';

import { APP_DIR, NODE_MODULES, babelRC } from './webpack.conf.js';

module.exports = function genConfig(mode) {

	// Get specific dev environment configuration values
	let localConfig = { 'CHECK_CIRCULAR_DEPENDENCIES': false };
	if (mode === 'development') {
		localConfig = require(path.resolve(__dirname, 'local.dev.js'));
	}

	const config = {
		entry: {
			vendor: [
				'mobx',
				'mobx-react',

				'react',
				'react-dom',
				'react-router'
			]
		},

		resolve: {
			extensions: ['.js', '.jsx', '.ts', '.tsx', '.less'],
			modules: ['./', APP_DIR, NODE_MODULES],
			symlinks: false,
			alias: {
				mobx: path.resolve(__dirname, 'node_modules/mobx')
			},

			plugins: [
				new TsConfigPathsPlugin(/* { configFileName, compiler } */)
			]
		},

		resolveLoader: {
			modules: ['node_modules']
		},

		// Tell webpack to run babel on every file it runs through
		module: {
			noParse: /node_modules\/localforage\/dist\/localforage.js/,

			rules: [

				// JS
				{
					enforce: 'pre',
					test: /.(js|.jsx)$/,
					exclude: [/\.(spec|test)\.(js|jsx)$/],
					use: [{loader: 'source-map-loader'}]
				},

				{
					test: /\.(js|jsx)$/,
					exclude: [/\.(spec|test)\.(js|jsx)$/, /localforage/, /\/node_modules\/localforage\//],
					use: [{
						loader: 'babel-loader',
						options: {
							babelrc: false,
							...babelRC,
						}
					}]
				},

				// TS
				{
					enforce: 'pre',
					test: /.(ts|.tsx)$/,
					exclude: [/\.(spec|test)\.(ts|tsx)$/],
					use: [{loader: 'source-map-loader'}, {loader: 'tslint-loader'}]
				},

				{
					test: /(.ts|.tsx)$/,
					exclude: [/\.(spec|test)\.(ts|tsx)$/],
					use: [
						{
							loader: 'awesome-typescript-loader',
							options: {
								useBabel: true,
								babelCore: "@babel/core",
								babelOptions: {
									babelrc: false,
									...babelRC
								},
								configFileName: 'tsconfig.json'
							}
						}
					]
				}
			]
		},

		optimization: {
			sideEffects: false,
			minimizer: [
				new UglifyWebpackPlugin({
					cache: true,
					parallel: true,
					uglifyOptions: {
						output: {
							comments: false,
							beautify: false
						},
						compress: {
							drop_console: true
						}
					}
				}),

				new OptimizeCSSAssetsPlugin({})
			]
		},

		plugins: [
			new webpack.ContextReplacementPlugin(/moment[\/\\]locale$/, /en/),

			// Transfer variables from package.json and local.dev.js
			new webpack.DefinePlugin({
				'process.env':{
					'NODE_ENV': JSON.stringify(mode),
					'SENTRY_DSN': JSON.stringify(process.env.SENTRY_DSN)
				}
			})
		]
	};

	// Check circular dependencies
	// TURN ON FOR EXAMPLE IF SOME OF YOU __WEBPACK__IMPORTED__X_ IS EQUAL TO undefined
	if (localConfig.CHECK_CIRCULAR_DEPENDENCIES) {
		config.plugins.push(
			new CircularDependencyPlugin({
				// exclude detection of files based on a RegExp
				exclude: /a\.js|node_modules/,
				// add errors to webpack instead of warnings
				failOnError: true,
				// allow import cycles that include an async import,
				// e.g. via import(/* webpackMode: "weak" */ './file.js')
				allowAsyncCycles: false,
				// set the current working directory for displaying module paths
				cwd: process.cwd(),
			})
		);
	}

	return config;
};
