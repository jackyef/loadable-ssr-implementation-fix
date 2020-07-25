const path = require('path');
const { merge } = require('webpack-merge');
const webpack = require('webpack');

const HtmlWebpackPlugin = require('html-webpack-plugin');
const ManifestPlugin = require('webpack-manifest-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const LodashModuleReplacementPlugin = require('lodash-webpack-plugin');
const AssetsPlugin = require('assets-webpack-plugin');
const LiveReloadPlugin = require('webpack-livereload-plugin');
const CompressionPlugin = require('compression-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const LoadablePlugin = require('@loadable/webpack-plugin')
// const CleanTerminalPlugin = require('clean-terminal-webpack-plugin');

const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');

const genConfig = require('./base.js');

const {
	APP_DIR,
	STYLES_DIRS,
	DEV_API_URL,
	BUILD_DIR_CLIENT,

	COMMON_CSS_LOADERS,
	COMMON_LESS_LOADERS,

	genCommonLessLoaders,
	generateFilename,
	genFileLoaders
} = require('./conf.js');

function genCustomConfig(mode, genOptions) {

	const config = {
		target: 'web',

		entry: {
			app: ['@babel/polyfill', './src/index.tsx']
		},

		output: {
			publicPath: genOptions.publicPath || '/static',
			path: path.resolve('bundle_client'),
			filename: generateFilename(mode),
			chunkFilename: generateFilename(mode, 'js', true),
		},

		module: {
			noParse: [/node_modules\/localforage\/dist\/localforage.js/],

			rules: [
				// LESS
				{
					test: /^((?!\.module).)*less$/,
					include: [APP_DIR].concat(STYLES_DIRS),
					use: [MiniCssExtractPlugin.loader].concat(COMMON_LESS_LOADERS)
				},

				// LESS (modules)
				{
					test: /\.module.less$/,
					include: [APP_DIR].concat(STYLES_DIRS),
					use: [MiniCssExtractPlugin.loader].concat(genCommonLessLoaders(mode))
				},

				// CSS
				{
					test: /\.css$/,
					use: [MiniCssExtractPlugin.loader].concat(COMMON_CSS_LOADERS)
				},

				// Handlebars
				{
					test: /\.hbs$/,
					use: ['handlebars-loader'],
				}
			]
		},

		devServer: {
			port: 5000,
			clientLogLevel: 'warning',
			compress: true,
			historyApiFallback: true,
			disableHostCheck: true,
			proxy: {
				'/api/**': {
					target: DEV_API_URL,
					changeOrigin: true,
					secure: false,
					rewrite: function (req) {
						req.url = req.url.replace(/^\/api/, '');
					}
				}
			}
		},

		plugins: [
			new CleanWebpackPlugin(),

			// Disabled in favour of WebpackBar
			// new CleanTerminalPlugin({
			// 	onlyInWatchMode: true,
			// 	message: 'CleanTerminalPlugin'
			// }),

			new LiveReloadPlugin(),
			new LoadablePlugin(),

			new ManifestPlugin(),

			new MiniCssExtractPlugin({
				filename: generateFilename(mode, 'css'),
				chunkFilename: generateFilename(mode, 'css', true),
				ignoreOrder: true
			}),

			new AssetsPlugin({
				filename: 'assets.json',
				prettyPrint: true,
				path: BUILD_DIR_CLIENT
			}),

			new LodashModuleReplacementPlugin({
				paths: true,
				collections: true,
				memoizing: true,
				shorthands: true
			}),

			new HtmlWebpackPlugin({
				filename: '../index.html',
				template: 'template.hbs',
				excludeChunks: genOptions.excludeFromHTML
			})
		]
	};

	switch (mode) {

		// Development
		case 'development':

			// Allow HRM for linked modules built with rollup
			config.resolve = {
				mainFields: ['browser', 'module', 'source', 'main']
			};

			break;

		// Production
		case 'production':

			config.plugins.concat([
				new webpack.HashedModuleIdsPlugin()
			]);

			config.plugins.push(
				new CompressionPlugin({
					algorithm: 'gzip',
					test: /\.js$|\.css$|\.html$/,
					threshold: 0,
					minRatio: 0.8
				})
			);

			if (process.env.STATS) {
				config.plugins.push(
					new BundleAnalyzerPlugin({
						analyzerMode: 'static',
						generateStatsFile: true,
						openAnalyzer: false
					})
				);
			}
	}

	// Apply static path
	// Generate file loaders (fonts, images, browserconfig, favicon)
	config.module.rules = [
		...config.module.rules,
		...genFileLoaders(genOptions.publicPath || config.output.publicPath)
	];

	return config;
}

// Merge with base config
module.exports = function (env, options, genOptions) {
	return merge(genConfig(options.mode), genCustomConfig(options.mode, genOptions));
};
