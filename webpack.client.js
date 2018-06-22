const path = require('path');
const merge = require('webpack-merge');
const webpack = require('webpack');
const baseConfig = require('./webpack.base.js');

const ManifestPlugin = require('webpack-manifest-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const ReactLoadablePlugin = require('react-loadable/webpack').ReactLoadablePlugin;
const LodashModuleReplacementPlugin = require('lodash-webpack-plugin');
const StyleLintPlugin = require('stylelint-webpack-plugin');
const AssetsPlugin = require('assets-webpack-plugin');
const LiveReloadPlugin = require('webpack-livereload-plugin');
const CompressionPlugin = require('compression-webpack-plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const CleanWebpackPlugin = require('clean-webpack-plugin');

const APP_DIR = path.resolve(__dirname);
const BUILD_DIR = path.resolve(__dirname, 'bundle_client');

const LINKED_MODULES = process.env.NODE_ENV === 'development'
	? [
		'/Users/max/Documents/repos/ui-kit',
		'/Users/max/Documents/repos/tg/tg-ui'
	]
	: []
;

// File loader
function createFileLoader(rootPath) {
	return [{
		loader: 'file-loader',
		options: {
			name: '[name].[ext]',
			publicPath: '/static/public',
			outputPath: rootPath ? rootPath.toString() : '',
			useRelativePath: false
		}
	}];
}

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

const config = {
	target: 'web',

	entry: {
		app: './src/index.tsx',
		resources: './resources/index.js'
	},

	output: {
		publicPath: '/static/public/',
		path: path.resolve(__dirname, 'bundle_client'),
		filename: process.env.NODE_ENV === 'development' ? '[name].js' : '[name].[contenthash].js',
		chunkFilename: process.env.NODE_ENV === 'development' ? 'chunks/[id].js' : 'chunks/[id].[chunkhash].js'
	},

	module: {
		noParse: /node_modules\/localforage\/dist\/localforage.js/,

		rules: [
			// LESS
			{
				test: /^((?!\.module).)*less$/,
				include: [APP_DIR].concat(LINKED_MODULES),
				use: [
					MiniCssExtractPlugin.loader,
					{
						loader: 'css-loader',
						options: {
							minimize: true
						}
					},
					{
						loader: 'postcss-loader',
						options: postcssOptions
					},
					'less-loader'
				]
			},

			// LESS (modules)
			{
				test: /\.module.less$/,
				include: [APP_DIR].concat(LINKED_MODULES),
				use: [
					MiniCssExtractPlugin.loader,
					{
						loader: 'css-loader',
						options: {
							minimize: true,
							modules: true,
							localIdentName: process.env.NODE_ENV === 'production' ? '[hash:base64:5]' : '[name]-[local]--[hash:base64:5]'
						}
					},
					{
						loader: 'postcss-loader',
						options: postcssOptions
					},
					'less-loader'
				]
			},

			// CSS
			{
				test: /\.css$/,
				include: APP_DIR,
				use: [
					MiniCssExtractPlugin.loader,
					{
						loader: 'css-loader',
						options: {
							minimize: true
						}
					},
					{
						loader: 'postcss-loader',
						options: postcssOptions
					}
				]
			},

			// CSS (node_modules)
			{
				test: /\.css$/,
				include: /\/node_modules\//,
				use: [
					MiniCssExtractPlugin.loader,
					{
						loader: 'css-loader',
						options: {
							minimize: true
						}
					},
					{
						loader: 'postcss-loader',
						options: postcssOptions
					}
				]
			},

			// Font (node_modules)
			{
				test: /\.ttf$|.\eot$|.\woff$|.\woff2$|^(?!.*\.inline\.svg$).*\.svg$/,
				include: /\/node_modules\//,
				use: createFileLoader('fonts')
			},

			// Font
			{
				test: /\.ttf$|\.eot$|.\woff$|.\woff2$|^(?!.*\.inline\.svg$).*\.svg$/,
				include: /resources\/fonts/,
				use: createFileLoader('fonts')
			},

			// Images
			{
				test: /\.jpe?g$|\.gif$|\.ico$|\.png$|^(?!.*\.inline\.svg$).*\.svg$/,
				exclude: [/\/node_modules\//, /resources\/favicon/],
				use: createFileLoader('images')
			},

			// SVG Inline
			{
				test: /\.inline.svg$/,
				use: [
					{ loader: 'babel-loader' },
					{ loader: "react-svg-loader", options: { jsx: true } }
				]
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

	devServer: {
		port: 5000,
		clientLogLevel: 'warning',
		compress: true,
		historyApiFallback: true,
		disableHostCheck: true,
		proxy: {
			'/api/**': {
				target: 'http://localhost:8001',
				changeOrigin: true,
				secure: false,
				rewrite: function(req) {
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
		new CleanWebpackPlugin(['bundle_client']),

		new ReactLoadablePlugin({
			filename: './bundle_client/react-loadable.json',
		}),

		new ManifestPlugin(),

		new MiniCssExtractPlugin({
			filename: process.env.NODE_ENV === 'development' ? '[name].css' : '[name].[contenthash].css',
			chunkFilename: process.env.NODE_ENV === 'development' ? 'chunks/[id].css' : 'chunks/[id].[contenthash].css',
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
if (process.env.NODE_ENV === 'development') {

	config.plugins.push(
		new LiveReloadPlugin({
			appendScriptTag: true
		})
	);
}

// Production
if (process.env.NODE_ENV === 'production') {

	config.plugins.concat([
		new webpack.HashedModuleIdsPlugin()
	]);

	config.plugins.push(
		new CompressionPlugin({
			asset: '[path].gz[query]',
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

// Merge with base config
module.exports = merge(baseConfig, config);
