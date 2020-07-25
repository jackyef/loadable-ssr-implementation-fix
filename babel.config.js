// Common Babel config
// https://babeljs.io/docs/en/config-files#project-wide-configuration
module.exports = {
	"plugins": [
		"@babel/plugin-syntax-dynamic-import",
		"@babel/plugin-syntax-import-meta",
		"@babel/plugin-transform-spread",

		["@babel/plugin-proposal-decorators", {
			"legacy": true
		}],
		["@babel/plugin-proposal-class-properties", {
			'loose': true
		}],

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

		["@babel/plugin-proposal-pipeline-operator", {
			"proposal": "minimal"
		}],

		"@loadable/babel-plugin",
		"babel-plugin-styled-components"
	],

	"presets": [
		["@babel/preset-env", {
			"useBuiltIns": "entry",
			'corejs': 2
		}],
		"@babel/preset-react"
	],

	"env": {
		"test": {
			"plugins": [
				"dynamic-import-node",
				"@babel/plugin-transform-modules-commonjs"
			],
			"presets": [
				"@babel/preset-react",
				[
					"@babel/preset-env",
					{
						"targets": {
							"browsers": [
								"> 5%"
							]
						},
						"modules": false
					}
				]
			]
		}
	}
}
