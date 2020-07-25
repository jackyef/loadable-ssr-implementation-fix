const path = require('path');

// --------------------------------------------------------------------------------------------------------------------
// Configuration values that can be changed from project to project
// --------------------------------------------------------------------------------------------------------------------

const APP_DIR = path.resolve('');
const BUILD_DIR_CLIENT = path.resolve('bundle_client');
const BUILD_DIR_SERVER = path.resolve('bundle_server');

const FAVICON_DIRS = /resources\/favicon/;
const DEV_API_URL = 'http://localhost:8001';

const FONTS_DIRS = [
	path.resolve("src/resources/fonts")
];

const IMAGES_DIRS = [
	path.resolve("src/resources/images"),
];

const STYLES_DIRS = [];

// --------------------------------------------------------------------------------------------------------------------
// Configuration that should be kept UNCHANGED from project to project
// --------------------------------------------------------------------------------------------------------------------

// Root node_modules
const NODE_MODULES = path.resolve('node_modules');

// CSS/LESS module options
function genCssModuleOption(mode) {
	return {
		modules: {
			localIdentName: mode === 'production' ? '[hash:base64:5]' : '[name]-[local]--[hash:base64:5]'
		},
	};
}

// Generate file names
function generateFilename(mode='development', ext='js', chunk=false) {
	return mode === 'development'
		? `${ chunk ? 'chunks/' : '' }[name].${ ext }`
		: `${ chunk ? 'chunks/' : '' }[name].[${ chunk ? 'chunk' : 'content' }hash].${ ext }`
	;
}

// File loader
function createFileLoader(rootPath, staticUrl='/static', emit=true) {
	return [{
		loader: 'file-loader',
		options: {
			name: '[name].[ext]',
			publicPath: staticUrl + (rootPath ?  '/' + rootPath.toString() : ''),
			outputPath: rootPath ? rootPath.toString() : '',
			useRelativePath: false,
			emitFile: emit
		}
	}];
}

// PostCSS options
const postcssOptions = {
	ident: 'postcss',
	plugins: function() {
		return [
			require('postcss-discard-duplicates')(),
			require('autoprefixer')()
		];
	}
};

// Loaders
const COMMON_CSS_LOADERS = [
	{ loader: 'css-loader' },
	{ loader: 'postcss-loader', options: postcssOptions }
];

const COMMON_LESS_LOADERS = [
	{ loader: "css-loader" },
	{ loader: 'postcss-loader', options: postcssOptions },
	{ loader: "less-loader" }
];

function genCommonLessLoaders(mode) {
	return [
		{ loader: "css-loader", options: genCssModuleOption(mode) },
		{ loader: 'postcss-loader', options: postcssOptions },
		{ loader: "less-loader" }
	];
}

// File loaders
function genFileLoaders(staticUrl='/static', emit=true) {
	return [

		// Fonts
		{
			test: /\.ttf$|\.eot$|.\woff$|.\woff2$|^(?!.*\.inline\.svg$).*\.svg$/,
			include: FONTS_DIRS,
			use: createFileLoader('fonts', staticUrl, emit)
		},

		// Fonts (node_modules)
		{
			test: /\.ttf$|\.eot$|.\woff$|.\woff2$/,
			exclude: FONTS_DIRS,
			use: createFileLoader('fonts', staticUrl, emit)
		},

		// Images
		{
			test: /\.jpe?g$|\.gif$|\.ico$|\.png$|^(?!.*\.inline\.svg$).*\.svg$/,
			include: IMAGES_DIRS,
			use: createFileLoader('images', staticUrl, emit)
		},

		// Images (node_modules)
		{
			test: /\.jpe?g$|\.gif$|\.ico$|\.png$|^(?!.*\.inline\.svg$).*\.svg$/,
			exclude: IMAGES_DIRS,
			use: createFileLoader('images', staticUrl, emit)
		},

		// Inline SVGs
		{
			test: /\.inline\.svg$/,
			include: IMAGES_DIRS,
			use: [
				// last tested version: 3.0.1
				{ loader: 'react-svg-loader' }
			]
		},

		// Favicon
		{
			test: /\.(ico|webmanifest|png|svg)$/,
			include: FAVICON_DIRS,
			use: createFileLoader('favicon', staticUrl, emit)
		},

		// browserconfig.xml
		{
			test: /browserconfig\.xml$/,
			use: createFileLoader(null, staticUrl).concat([
				{ loader: 'web-app-browserconfig-loader' }
			])
		}
	];
}

// --------------------------------------------------------------------------------------------------------------------
// .babelrc to use webpack files with ES6
// --------------------------------------------------------------------------------------------------------------------

// SVGO options
const svgoOptions = {
	floatPrecision: 2,
	plugins: [
		{cleanupAttrs: true},
		{removeDoctype: true},
		{removeXMLProcInst: true},
		{removeComments: true},
		{removeMetadata: true},
		{removeTitle: true},
		{removeDesc: true},
		{removeUselessDefs: true},
		{removeEditorsNSData: true},
		{removeEmptyAttrs: true},
		{removeHiddenElems: true},
		{removeEmptyText: true},
		{removeEmptyContainers: true},
		{removeViewBox: false},
		{cleanUpEnableBackground: true},
		{convertStyleToAttrs: true},
		{convertColors: true},
		{
			/* https://github.com/svg/svgo/blob/master/plugins/convertPathData.js#L9-L26 */
			convertPathData: false
		},
		{convertTransform: true},
		{removeUnknownsAndDefaults: true},
		{removeNonInheritableGroupAttrs: true},
		{removeUselessStrokeAndFill: true},
		{removeUnusedNS: true},
		{cleanupIDs: false},
		{cleanupNumericValues: true},
		{moveElemsAttrsToGroup: true},
		{moveGroupAttrsToElems: true},
		{collapseGroups: true},
		{removeRasterImages: false},
		{mergePaths: true},
		{convertShapeToPath: true},
		{transformsWithOnePath: false},
		{removeDimensions: true}
	]
};

const babelRC = {
	plugins: [
		"@babel/plugin-syntax-dynamic-import",
		"@babel/plugin-syntax-import-meta",
		"@babel/plugin-transform-spread",

		"@babel/plugin-proposal-class-properties",
		"@babel/plugin-proposal-do-expressions",
		"@babel/plugin-proposal-export-default-from",
		"@babel/plugin-proposal-export-namespace-from",
		"@babel/plugin-proposal-function-bind",
		"@babel/plugin-proposal-function-sent",
		"@babel/plugin-proposal-json-strings",
		"@babel/plugin-proposal-logical-assignment-operators",
		"@babel/plugin-proposal-nullish-coalescing-operator",
		"@babel/plugin-proposal-numeric-separator",
		"@babel/plugin-proposal-optional-chaining",
		"@babel/plugin-proposal-throw-expressions",

		["@babel/plugin-proposal-pipeline-operator", { proposal: "minimal" }],
		["@babel/plugin-proposal-decorators", { legacy: true }],

		"@loadable/babel-plugin",
		"babel-plugin-styled-components",

		["inline-react-svg", {
			ignorePattern: /^(?!.*\.inline\.svg$).*\.svg$/,
			svgo: svgoOptions
		}]
	],

	presets: [
		[
			"@babel/preset-env",
			{ modules: false, useBuiltIns: "entry" }
		],
		"@babel/preset-react"
	],

	env: {
		test: {
			plugins: [
				"dynamic-import-node",
				"@babel/plugin-transform-modules-commonjs"
			],
			presets: [
				"@babel/preset-react",
				[
					"@babel/preset-env",
					{
						targets: {
							browsers: [
								"> 5%"
							]
						},
						modules: false
					}
				]
			]
		}
	}
};

module.exports = {
	APP_DIR,
	STYLES_DIRS,
	BUILD_DIR_CLIENT,
	BUILD_DIR_SERVER,
	FAVICON_DIRS,
	DEV_API_URL,
	FONTS_DIRS,
	IMAGES_DIRS,
	NODE_MODULES,

	COMMON_CSS_LOADERS,
	COMMON_LESS_LOADERS,

	generateFilename,
	createFileLoader,
	postcssOptions,
	genCommonLessLoaders,
	genFileLoaders,

	babelRC
};
