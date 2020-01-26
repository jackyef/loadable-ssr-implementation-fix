const path = require('path');
const config = require('@tg/configs/lint/common.eslintrc');

module.exports = {
	...config,
	'parserOptions': {
		...config.parserOptions,
		'project': path.resolve(__dirname, './tsconfig.json')
	}
};
