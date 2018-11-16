import path from 'path';
import merge from 'webpack-merge';
import webpack from 'webpack';

import HtmlWebpackPlugin from 'html-webpack-plugin';
import ManifestPlugin from 'webpack-manifest-plugin';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import LodashModuleReplacementPlugin from 'lodash-webpack-plugin';
import StyleLintPlugin from 'stylelint-webpack-plugin';
import AssetsPlugin from 'assets-webpack-plugin';
import LiveReloadPlugin from 'webpack-livereload-plugin';
import CompressionPlugin from 'compression-webpack-plugin';
import CleanWebpackPlugin from 'clean-webpack-plugin';

import { ReactLoadablePlugin } from 'react-loadable/webpack';
import { BundleAnalyzerPlugin } from 'webpack-bundle-analyzer';

import genConfig from './webpack.base.js';

import {
	APP_DIR,
	STATIC_URL,
	DEV_API_URL,
	BUILD_DIR_CLIENT as BUILD_DIR,

	COMMON_CSS_LOADERS,
	COMMON_LESS_LOADERS,

	getLinkedModules,
	genCommonLessLoaders,
	generateFilename,
	genFileLoaders
} from './webpack.conf.js';

function genCustomConfig(mode) {

	// Get specific dev environment configuration values
	const localConfig = mode === 'development'
		? require(path.resolve(__dirname, 'local.dev.js'))
		: {
			'LINKED_MODULES_ROOT': '',
			'GENERATE_HTML': false
		}
	;

	const prod = mode === 'production';

	const config = {
		target: 'web',

		entry: {
			app: ["@babel/polyfill", './src/index.tsx'],
			resources: './resources/index.js'
		},

		output: {
			publicPath: `${ STATIC_URL }/`,
			path: path.resolve(__dirname, 'bundle_client'),
			filename: generateFilename(mode),
			chunkFilename: generateFilename(mode, 'js', true),
		},

		module: {
			noParse: /node_modules\/localforage\/dist\/localforage.js/,

			rules: [
				// LESS
				{
					test: /^((?!\.module).)*less$/,
					include: [APP_DIR].concat(getLinkedModules(mode, localConfig.LINKED_MODULES_ROOT)),
					use: [prod ? MiniCssExtractPlugin.loader : {loader: 'style-loader'}].concat(COMMON_LESS_LOADERS)
				},

				// LESS (modules)
				{
					test: /\.module.less$/,
					include: [APP_DIR].concat(getLinkedModules(mode, localConfig.LINKED_MODULES_ROOT)),
					use: [prod ? MiniCssExtractPlugin.loader : {loader: 'style-loader'}].concat(genCommonLessLoaders(mode))
				},

				// CSS
				{
					test: /\.css$/,
					use: [prod ? MiniCssExtractPlugin.loader : {loader: 'style-loader'}].concat(COMMON_CSS_LOADERS)
				},

				// Generate file loaders (fonts, images, browserconfig, favicon)
				...genFileLoaders()
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

		optimization: {
			splitChunks: {
				cacheGroups: {
					vendor: {
						chunks: 'initial',
						name: 'vendor',
						test: 'vendor',
						enforce: true
					}
				}
			}
		},

		plugins: [
			new CleanWebpackPlugin(['bundle_client/*.*']),

			new ReactLoadablePlugin({
				filename: './bundle_client/react-loadable.json',
			}),

			new ManifestPlugin(),

			new MiniCssExtractPlugin({
				filename: generateFilename(mode, 'css'),
				chunkFilename: generateFilename(mode, 'css', true),
			}),

			new StyleLintPlugin({
				configFile: './.stylelintrc',
				emitErrors: false
			}),

			new AssetsPlugin({
				filename: 'assets.json',
				prettyPrint: true,
				path: BUILD_DIR
			}),

			new LodashModuleReplacementPlugin({
				paths: true,
				collections: true,
				memoizing: true
			})
		]
	};

	// Development
	if (mode === 'development') {

		// HTML
		localConfig.GENERATE_HTML && config.plugins.push(
			new HtmlWebpackPlugin({
				filename: '../index.html',
				template: 'template.hbs',
				chunks: []
			})
		);

		// Live reload
		config.plugins.push(
			new LiveReloadPlugin({
				appendScriptTag: true
			})
		);
	}

	// Production
	if (mode === 'production') {

		config.plugins.concat([
			new webpack.HashedModuleIdsPlugin()
		]);

		// HTML
		localConfig.GENERATE_HTML && config.plugins.push(
			new HtmlWebpackPlugin({
				filename: 'index.html',
				template: 'template.hbs',
				chunks: []
			})
		);

		config.plugins.push(
			new CompressionPlugin({
				algorithm: 'gzip',
				test: /\.js$|\.css$|\.html$/,
				threshold: 0,
				minRatio: 0.8
			})
		);

		config.plugins.push(
			new BundleAnalyzerPlugin({
				analyzerMode: 'static',
				generateStatsFile: true,
				openAnalyzer: false
			})
		);
	}

	return config;
}

// Merge with base config
module.exports = function(env, options) {
	return merge(genConfig(options.mode), genCustomConfig(options.mode));
};
