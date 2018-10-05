const webpack = require('webpack');
const path = require('path');
const merge = require('webpack-merge');
const baseConfig = require('./webpack.base.js');
const webpackNodeExternals = require('webpack-node-externals');
const CleanWebpackPlugin = require('clean-webpack-plugin');

const APP_DIR = path.resolve(__dirname);
const BUILD_DIR = path.resolve(__dirname, 'bundle_server');

const LINKED_MODULES = process.env.NODE_ENV === 'development'
	? [
		'/Users/max/Documents/repos/ui-kit',
		'/Users/max/Documents/repos/tg/tg-ui'
	]
	: []
;

// PostCSS options
const postcssOptions = {
	ident: 'postcss',
	plugins: function() {
		return [
			require('postcss-discard-duplicates')(),
			require('autoprefixer')({
				browsers: [
					'> 5%',
					'last 2 versions',
					'IE >= 11'
				]
			})
		];
	}
};

// File loader
function createFileLoader(rootPath) {
	return [{
		loader: 'file-loader',
		options: {
			name: '[name].[ext]',
			publicPath: '/static/public' + (rootPath ?  '/' + rootPath.toString() : ''),
			outputPath: rootPath ? rootPath.toString() : '',
			useRelativePath: false,
			emitFile: false
		}
	}];
}

const config = {
    // Inform webpack that we are building a bundle
    // for NodeJS, rather than for the browser
    target: 'node',

	node: {
		__dirname: false,
		__filename: false
  	},

    // Tell webpack the root file of our server app
    entry: {
        server: ['babel-polyfill', './src/server.tsx']
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
				include: [APP_DIR].concat(LINKED_MODULES),
				use: [
					{ loader: "isomorphic-style-loader" },
					{ loader: "css-loader", options: { minimize: true } },
					{ loader: 'postcss-loader', options: postcssOptions },
					{ loader: "less-loader" }
				]
			},

			// LESS (modules)
			{
				test: /\.module.less$/,
				include: [APP_DIR].concat(LINKED_MODULES),
				use: [
					{ loader: "isomorphic-style-loader" },
					{ loader: "css-loader", options: { modules: true, minimize: true, localIdentName: process.env.NODE_ENV === 'production' ? '[hash:base64:5]' : '[name]-[local]--[hash:base64:5]' }},
					{ loader: 'postcss-loader', options: postcssOptions },
					{ loader: "less-loader" }
				]
			},

			// Fonts
			{
				test: /\.ttf$|\.eot$|.\woff$|.\woff2$|^(?!.*\.inline\.svg$).*\.svg$/,
				include: [
					path.resolve(__dirname, "node_modules/@tg/ui/resources/fonts"),
					path.resolve(__dirname, "node_modules/@scc/ui-kit/src/core/styles/__fonts__"),
					path.resolve(__dirname, "node_modules/slick-carousel/slick/fonts"),
					path.resolve(__dirname, "src/resources/fonts"),
				],
				use: createFileLoader('fonts')
			},

			// Images
			{
				test: /\.jpe?g$|\.gif$|\.ico$|\.png$|^(?!.*\.inline\.svg$).*\.svg$/,
				use: createFileLoader('images')
			},

			// Favicon
			{
				test: /\.(ico|webmanifest|png|svg)$/,
				include: /resources\/favicon/,
				use: createFileLoader('favicon')
			},

			// browserconfig.xml
			{
				test: /browserconfig\.xml$/,
				use: createFileLoader().concat([
					{ loader: 'web-app-browserconfig-loader' }
				])
			}
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

// Merge with base config
module.exports = merge(baseConfig, config);
