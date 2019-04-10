module.exports = {
	root: true,
	env: {
		browser: true,
		node: true
	},
	parserOptions: {
		parser: 'babel-eslint'
	},
	extends: [
		'@nuxtjs',
		'plugin:nuxt/recommended'
	],
	// add your custom rules here
	rules: {
		'comma-dangle': [ 2, 'always-multiline' ],
		'indent': [ 2, 'tab' ],
		'no-tabs': 0,
		'semi': [ 2, 'always' ],
		'vue/html-indent': [2, 'tab'],
		'nuxt/no-cjs-in-config': 'off',
	}
}
