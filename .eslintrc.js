const path = require('path');

module.exports = {
	env: {
		browser: true,
		es6: true,
		node: true
	},
	parser: '@typescript-eslint/parser',
	parserOptions: {
		project: path.resolve(__dirname, './tsconfig.json'),
		ecmaVersion: 2020,
		sourceType: 'module',
		ecmaFeatures: {
			jsx: true
		}
	},
	settings: {
		react: {
			pragma: 'React',
			version: 'detect'
		}
	},
	extends: [
		'eslint:recommended',
		'plugin:@typescript-eslint/eslint-recommended',
		'plugin:@typescript-eslint/recommended',
		'plugin:@typescript-eslint/recommended-requiring-type-checking',
		'plugin:react/recommended',
		'plugin:lodash/recommended',
		'plugin:promise/recommended'
	],
	plugins: [
		'@typescript-eslint',
		'@typescript-eslint/tslint',
		'eslint-plugin-import',
		'no-null',
		'import',
		'prefer-arrow',
		'react',
		'react-hooks',
		'lodash',
		'promise'
	],
	rules: {
		'lodash/import-scope': [2, 'full'],
		'lodash/chaining': [1, 'implicit'],
		'react/prop-types': 0,
		'@typescript-eslint/no-unsafe-assignment': 0,
		'@typescript-eslint/unbound-method': 0,
		'@typescript-eslint/camelcase': 0,
		'@typescript-eslint/explicit-function-return-type': [1, {
			'allowExpressions': true
		}]
	}
};
