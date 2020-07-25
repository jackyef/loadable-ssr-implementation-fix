const path = require('path');

const { merge } = require('webpack-merge');
const webpackNodeExternals = require('webpack-node-externals');

const { CleanWebpackPlugin } = require('clean-webpack-plugin');

const genConfig = require('./base.js');

const {
	APP_DIR,
	BUILD_DIR_SERVER,

	COMMON_CSS_LOADERS,
	COMMON_LESS_LOADERS,

	genCommonLessLoaders,
	genFileLoaders
} = require('./conf');

function genCustomConfig(mode, genOptions) {
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
			server: ['@babel/polyfill', './src/server.tsx']
		},

		// Tell webpack where to put the output file
		// that is generated
		output: {
			filename: '[name].js',
			path: BUILD_DIR_SERVER,
			library: 'app',
			libraryTarget: 'commonjs2',
			publicPath: genOptions.publicPath
		},

		module: {
			rules: [
				// CSS
				{
					test: /\.css$/,
					use: [{loader: "isomorphic-style-loader"}].concat(COMMON_CSS_LOADERS)
				},

				// LESS
				{
					test: /^((?!\.module).)*less$/,
					include: [APP_DIR],
					use: [{loader: "isomorphic-style-loader"}].concat(COMMON_LESS_LOADERS)
				},

				// LESS (modules)
				{
					test: /\.module.less$/,
					include: [APP_DIR],
					use: [{loader: "isomorphic-style-loader"}].concat(genCommonLessLoaders(mode))
				},

				...genFileLoaders(genOptions.publicPath, false)
			]
		},

		plugins: [
			new CleanWebpackPlugin()
		],

		// Do not place in a bundle modules that are
		// presented in the node_modules.
		// It reduces bundle.js size (840kb -> 8kb in that case)
		// but we don't care. What we do care is that webpack bundle
		// works faster
		externals: [webpackNodeExternals({
			allowlist: [
				/\.(?!(?:jsx?|json)$).{1,5}$/i
			]
		})]
	};
}

// Merge with base config
module.exports = function (env, options, genOptions) {
	return merge(genConfig(options.mode), genCustomConfig(options.mode, genOptions));
};
