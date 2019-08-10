const merge = require('webpack-merge');



module.exports = function(env, options) {
	return merge(
		require('@tg/configs/build/webpack/client.js')(
			env,
			options,
			{
				publicPath: '/static/public/'
			}
		),
	);
}
