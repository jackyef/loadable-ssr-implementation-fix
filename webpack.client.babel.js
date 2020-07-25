const path = require('path')
const { merge } = require('webpack-merge');

module.exports = function(env, options) {
	return merge(
		require('./webpack/client.js')(env, options, {
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
			}
		}
	);
};
