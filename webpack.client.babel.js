const merge = require('webpack-merge');

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
	'@scc',
	'@tg'
];

// Webpack config
module.exports = function(env, options) {
	return merge(
		require('@tg/configs/build/webpack/client.js')(env, options, {
			publicPath: '/static/public/',
			excludeFromHTML: ['resources', 'extra']
		}),
		{
			optimization: {
				splitChunks: {
					cacheGroups: {
						default: false,
						vendors: false,

						// Vendor (without @tg, @scc modules)
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
						},

						// Not used modules
						// extra: {
						// 	chunks: 'all',
						// 	name: 'extra',
						// 	test(mod/* , chunk */) {
						// 		if (!mod.context) { return true; }
						// 		if (!mod.context.includes('node_modules')) { return false; }
						// 		return extraModules.some(str => mod.context.includes(str));
						// 	}
						// }
					}
				}
			}
		}
	);
};
