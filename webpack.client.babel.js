const merge = require('webpack-merge');

// Not used modules
const extraModules = [
	'slate',
	'emoji-mart',
	'react-draggable',
	'sockjs-client',
	'webstomp-client'
];

// Our internal modules (For now keep them in the app)
const appModules = [
	'@scc',
	'@tg'
];

// Webpack config
module.exports = function(env, options) {
	return merge(
		require('@tg/configs/build/webpack/client.js')(env, options, { publicPath: '/static/public/' }),
		{
			optimization: {
				splitChunks: {
					cacheGroups: {
						default: false,
						vendors: false,

						// Not used modules
						extra: {
							chunks: 'all',
							name: 'extra',
							test(mod/* , chunk */) {
								if (!mod.context.includes('node_modules')) { return false; }
								return extraModules.some(str => mod.context.includes(str));
							}
						},

						// Vendor (without @tg, @scc modules)
						vendor: {
							chunks: 'all',
							name: 'vendor',
							test(mod/* , chunk */) {
								if (!mod.context.includes('node_modules')) { return false; }
								return !(
									extraModules.some(str => mod.context.includes(str)) ||
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
