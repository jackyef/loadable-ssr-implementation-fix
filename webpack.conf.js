import path from 'path';

// --------------------------------------------------------------------------------------------------------------------
// Configuration values that can be changed from project to project
// --------------------------------------------------------------------------------------------------------------------

export const APP_DIR = path.resolve(__dirname);
export const BUILD_DIR_CLIENT = path.resolve(__dirname, 'bundle_client');
export const BUILD_DIR_SERVER = path.resolve(__dirname, 'bundle_server');

export const FAVICON_DIRS = /resources\/favicon/;
export const DEV_API_URL = 'http://localhost:8001';
export const STATIC_URL = '/static/public';

export const FONTS_DIRS = [
	path.resolve(__dirname, "node_modules/@tg/ui/resources/fonts"),
	path.resolve(__dirname, "src/resources/fonts")
];

export const IMAGES_DIRS = [
	path.resolve(__dirname, "node_modules/@tg/ui/resources/images"),
	path.resolve(__dirname, "src/resources/images")
];

const LINKED_MODULES = [
	'ui-kit',
	'tg/tg-ui'
];

// --------------------------------------------------------------------------------------------------------------------
// Configuration that should be kept UNCHANGED from project to project
// --------------------------------------------------------------------------------------------------------------------

// Get linked modules based on current mode
export function getLinkedModules(mode, rootPath) {
	return mode === 'development'
		? LINKED_MODULES.map(m => `${ rootPath }/${ m }`)
		: []
	;
}

// Root node_modules
export const NODE_MODULES = path.resolve(__dirname, 'node_modules');

// CSS/LESS module options
function genCssModuleOption(mode) {
	return {
		modules: true,
		localIdentName: mode === 'production' ? '[hash:base64:5]' : '[name]-[local]--[hash:base64:5]'
	};
}

// Generate file names
export function generateFilename(mode='development', ext='js', chunk=false) {
	return mode === 'development'
		? `${ chunk ? 'chunks/' : '' }[name].${ ext }`
		: `${ chunk ? 'chunks/' : '' }[name].[${ chunk ? 'chunk' : 'content' }hash].${ ext }`
	;
}

// File loader
export function createFileLoader(rootPath, emit=true) {
	return [{
		loader: 'file-loader',
		options: {
			name: '[name].[ext]',
			publicPath: STATIC_URL + (rootPath ?  '/' + rootPath.toString() : ''),
			outputPath: rootPath ? rootPath.toString() : '',
			useRelativePath: false,
			emitFile: emit
		}
	}];
}

// PostCSS options
export const postcssOptions = {
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

// Loaders
export const COMMON_CSS_LOADERS = [
	{ loader: 'css-loader' },
	{ loader: 'postcss-loader', options: postcssOptions }
];

export const COMMON_LESS_LOADERS = [
	{ loader: "css-loader" },
	{ loader: 'postcss-loader', options: postcssOptions },
	{ loader: "less-loader" }
];

export function genCommonLessLoaders(mode) {
	return [
		{ loader: "css-loader", options: genCssModuleOption(mode) },
		{ loader: 'postcss-loader', options: postcssOptions },
		{ loader: "less-loader" }
	];
}

// File loaders
export function genFileLoaders(emit=true) {
	return [

		// Fonts
		{
			test: /\.ttf$|\.eot$|.\woff$|.\woff2$|^(?!.*\.inline\.svg$).*\.svg$/,
			include: FONTS_DIRS,
			use: createFileLoader('fonts', emit)
		},

		// Fonts (node_modules)
		{
			test: /\.ttf$|\.eot$|.\woff$|.\woff2$/,
			exclude: FONTS_DIRS,
			use: createFileLoader('fonts', emit)
		},

		// Images
		{
			test: /\.jpe?g$|\.gif$|\.ico$|\.png$|^(?!.*\.inline\.svg$).*\.svg$/,
			include: IMAGES_DIRS,
			use: createFileLoader('images', emit)
		},

		// Images (node_modules)
		{
			test: /\.jpe?g$|\.gif$|\.ico$|\.png$|\.svg$/,
			exclude: IMAGES_DIRS,
			use: createFileLoader('images', emit)
		},

		// Favicon
		{
			test: /\.(ico|webmanifest|png|svg)$/,
			include: FAVICON_DIRS,
			use: createFileLoader('favicon', emit)
		},

		// browserconfig.xml
		{
			test: /browserconfig\.xml$/,
			use: createFileLoader().concat([
				{ loader: 'web-app-browserconfig-loader' }
			])
		}
	];
}

// --------------------------------------------------------------------------------------------------------------------
// .babelrc to use webpack files with ES6
// --------------------------------------------------------------------------------------------------------------------

export const babelRC = {
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

		"react-loadable/babel",

		["inline-react-svg", {
			ignorePattern: /^(?!.*\.inline\.svg$).*\.svg$/,
			svgo: {
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
			}
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
