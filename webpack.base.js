const path = require('path');
const webpack = require('webpack');

const APP_DIR = path.resolve(__dirname);
const NODE_MODULES = path.resolve(__dirname, 'node_modules');

const UglifyWebpackPlugin = require('uglifyjs-webpack-plugin');
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const { TsConfigPathsPlugin } = require('awesome-typescript-loader');

module.exports = {

	entry: {
		vendor: [
			'babel-polyfill',

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
			mobx: path.resolve(__dirname, 'node_modules/mobx'),
			tgimg: path.resolve(__dirname, 'node_modules/@tg/ui/resources/images')
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
				use: [{loader: 'babel-loader'}]
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
							configFileName: 'tsconfig.json'
						}
					}
					// {loader: "babel-loader"}, {loader: "ts-loader"}
				]
			}
        ]
    },

	optimization: {
		minimizer: [
			new UglifyWebpackPlugin({
				sourceMap: true,
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
