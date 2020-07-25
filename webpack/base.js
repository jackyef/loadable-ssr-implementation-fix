const path = require('path');
const webpack = require('webpack');

const TerserPlugin = require('terser-webpack-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin');
const WebpackBar = require('webpackbar');
const createStyledComponentsTransformer = require('typescript-plugin-styled-components').default;

const { APP_DIR, NODE_MODULES, babelRC } = require('./conf.js');

const styledComponentsTransformer = createStyledComponentsTransformer();

module.exports = function genConfig(mode) {
	const config = {

		stats: {
			children: false
		},

		resolve: {
			extensions: ['.js', '.jsx', '.ts', '.tsx', '.less'],
			modules: ['./', APP_DIR, NODE_MODULES, 'node_modules'],
			symlinks: false,
			alias: {
				mobx: path.resolve('node_modules/mobx'),
				// Need it here to read from src folder instead of dist because otherwise source-map-loader
				// throws a ton of warning about that it can not read a source map from given sourceMappingURL
				// 'axios-cache-adapter': path.resolve('node_modules/axios-cache-adapter/src')

				// ^ DO NOT UNCOMMENT IF WE USE A COMMON WARNING FILTER. SEE stats SECTION BELOW
			},

			plugins: [
				new TsconfigPathsPlugin({ /*configFile: "./tsconfig.json" */ })
			]
		},

		resolveLoader: {
			modules: ['node_modules']
		},

		// Tell webpack to run babel on every file it runs through
		module: {
			noParse: [/node_modules\/localforage\/dist\/localforage.js/],

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
					exclude: [
						/\.(spec|test)\.(js|jsx)$/
					],
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
					exclude: [/\.(spec|test)\.(ts|tsx)$/, /node_modules/],
					use: [
						{ loader: 'source-map-loader' },
						{ loader: 'eslint-loader' }
					]
				},

				{
					test: /(.ts|.tsx)$/,
					exclude: [/\.(spec|test)\.(ts|tsx)$/],
					use: [
						{
							loader: 'babel-loader',
							options: {
								babelrc: false,
								...babelRC,
							}
						},
						{
							loader: 'ts-loader',
							options: {
								allowTsInNodeModules: true,
								getCustomTransformers: () => ({
									before: [styledComponentsTransformer]
								})
								// ForkTsCheckerWebpackPlugin
								// transpileOnly: true
							}
						}
					]
				}
			]
		},

		stats: {
			warningsFilter: [/Failed to parse source map/],
		},

		optimization: {
			// sideEffects: false,
			usedExports: true,
			providedExports: true,
			minimizer: [
				new TerserPlugin({
					terserOptions: {
						drop_console: true,
						dead_code: true,
						output: {
							comments: false
						}
					}
				}),
				new OptimizeCSSAssetsPlugin({})
			]
		},

		plugins: [
			new WebpackBar(),
			new webpack.ContextReplacementPlugin(/moment[\/\\]locale$/, /en/),

			// Transfer variables from package.json and local.dev.js
			new webpack.DefinePlugin({
				'process.env.NODE_ENV': JSON.stringify(mode)
			})
		]
	};

	return config;
};
