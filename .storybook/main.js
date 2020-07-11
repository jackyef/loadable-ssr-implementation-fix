const path = require('path');

const IMAGES_DIRS = [
	path.resolve("node_modules/@prostpost/resources/src/images"),
	path.resolve("node_modules/@prostpost/resources/src/inline")
];

module.exports = {
	stories: ['../src/**/*.stories.(tsx|mdx)'],
	addons: [
		'@storybook/addon-docs',
		'@storybook/addon-actions/register',
		'@storybook/addon-knobs/register',
		'@storybook/addon-notes/register',
		'@storybook/addon-viewport/register',
		'@storybook/addon-links/register'
	],

	webpackFinal: config => {

		const fileLoaderRule = config.module.rules.find(rule => rule.test.test('.svg'));
		fileLoaderRule.exclude = /\.inline.svg$/;

		config.module.rules.push({
			test: /\.(ts|tsx)$/,
			use: [{
				loader: require.resolve('babel-loader'),
				options: {
					plugins: [
						'babel-plugin-react-docgen',
						['inline-react-svg', {
							ignorePattern: /^(?!.*\.inline\.svg$).*\.svg$/
						}]
					],
					presets: [
						['react-app', {
							flow: false,
							typescript: true
						}]
					]
				}
			}]
		});

		config.module.rules.push({
			test: /\.(js|jsx)$/,
			loader: require.resolve('babel-loader'),
			options: {
				plugins: [
					['inline-react-svg', {
						ignorePattern: /^(?!.*\.inline\.svg$).*\.svg$/
					}]
				]
			}
		});

		config.module.rules.push({
			test: /\.inline\.svg$/,
			use: [
				// last tested version: 3.0.1
				{
					loader: 'react-svg-loader'
				}
			]
		});

		config.resolve.extensions.push('.ts', '.tsx');
		return config;
	}
};
