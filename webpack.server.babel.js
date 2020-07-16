const { merge } = require('webpack-merge');

// Webpack config
module.exports = function(env, options) {
	return merge(
		require('@prostpost/configs/build/webpack/server.js')(env, options, { publicPath: '/static/public/' }),
		{}
	);
};
