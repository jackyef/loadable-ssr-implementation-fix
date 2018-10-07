import path from 'path';

import merge from 'webpack-merge';
import webpackNodeExternals from 'webpack-node-externals';

import CleanWebpackPlugin from 'clean-webpack-plugin';

import genConfig from './webpack.base.js';

import {
	APP_DIR,
	BUILD_DIR_SERVER as BUILD_DIR,

	COMMON_LESS_LOADERS,

	getLinkedModules,
	genCommonLessLoaders,
	genFileLoaders
} from './webpack.conf';

function genCustomConfig(mode) {

	// Get specific dev environment configuration values
	let localConfig = { 'LINKED_MODULES_ROOT': [] };
	if (mode === 'development') {
		localConfig = require(path.resolve(__dirname, 'local.dev.js'));
	}

	return {
		// Inform webpack that we are building a bundle
		// for NodeJS, rather than for the browser
		target: 'node',

		node: {
			__dirname: false,
			__filename: false
		},

		// Tell webpack the root file of our server app
		entry: {
			server: './src/server.tsx'
		},

		// Tell webpack where to put the output file
		// that is generated
		output: {
			filename: '[name].js',
			path: BUILD_DIR
		},

		module: {
			rules: [
				// LESS
				{
					test: /^((?!\.module).)*less$/,
					include: [APP_DIR].concat(getLinkedModules(mode, localConfig.LINKED_MODULES_ROOT)),
					use: [{loader: "isomorphic-style-loader"}].concat(COMMON_LESS_LOADERS)
				},

				// LESS (modules)
				{
					test: /\.module.less$/,
					include: [APP_DIR].concat(getLinkedModules(mode, localConfig.LINKED_MODULES_ROOT)),
					use: [{loader: "isomorphic-style-loader"}].concat(genCommonLessLoaders(mode))
				},

				...genFileLoaders(false)
			]
		},

		plugins: [
			new CleanWebpackPlugin(['bundle_server/*.*'])
		],

		// Do not place in a bundle modules that are
		// presented in the node_modules.
		// It reduces bundle.js size (840kb -> 8kb in that case)
		// but we don't care. What we do care is that webpack bundle
		// works faster
		externals: [webpackNodeExternals({
			whitelist: [/^@scc\/ui-kit/, /^@tg\/ui/]
		})]
	};
}

// Merge with base config
module.exports = function (env, options) {
	return merge(genConfig(options.mode), genCustomConfig(options.mode));
};
