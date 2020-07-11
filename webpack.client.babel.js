const path = require('path')
const { merge } = require('webpack-merge');

// Not used modules
// const extraModules = [
// 	'slate',
// 	'emoji-mart',
// 	'react-draggable',
// 	'sockjs-client',
// 	'webstomp-client',
// 	'rc-slider'
// ];

// Our internal modules (For now keep them in the app)
const appModules = [
	'@prostpost'
];

// Webpack config
module.exports = function(env, options) {
	return merge(
		require('@prostpost/configs/build/webpack/client.js')(env, options, {
			publicPath: '/static/public/',
			excludeFromHTML: ['resources', 'extra']
		}),
		{
			resolve: {
				alias: {
					"app/config": path.resolve(__dirname, 'src/config/'),
					"app/stores": path.resolve(__dirname, 'src/stores/'),
					"app/routes": path.resolve(__dirname, 'src/routes/'),
					"app/components": path.resolve(__dirname, 'src/components/')
				}
			},

			optimization: {
				splitChunks: {
					cacheGroups: {
						default: false,
						vendors: false,

						// Vendor (without @prostpost modules)
						vendor: {
							chunks: 'all',
							name: 'vendor',
							test(mod/* , chunk */) {
								if (!mod.context) { return true; }
								if (!mod.context.includes('node_modules')) { return false; }
								return !(
									// extraModules.some(str => mod.context.includes(str)) ||
									appModules.some(str => mod.context.includes(str))
								);
							}
						}
					}
				}
			}
		}
	);
};
