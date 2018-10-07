import path from 'path';
import webpack from 'webpack';

import UglifyWebpackPlugin from 'uglifyjs-webpack-plugin';
import OptimizeCSSAssetsPlugin from 'optimize-css-assets-webpack-plugin';
import { TsConfigPathsPlugin } from 'awesome-typescript-loader';

import { APP_DIR, NODE_MODULES, babelRC } from './webpack.conf.js';

module.exports = function genConfig(mode) {
	return {
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
						}
					}
				}),

				new OptimizeCSSAssetsPlugin({})
			]
		},

		plugins: [
			new webpack.ContextReplacementPlugin(/moment[\/\\]locale$/, /en/)
		]
	};
};
