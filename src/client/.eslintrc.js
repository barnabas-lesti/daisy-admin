module.exports = {
	env: {
		node: true,
	},
	extends: [
		'plugin:vue/essential',
		'@vue/standard',
	],
	parserOptions: {
		parser: 'babel-eslint',
	},
	root: true,
	rules: {
		'comma-dangle': [
			2,
			'always-multiline',
		],
		'indent': [
			2,
			'tab',
		],
		'no-tabs': 0,
		'semi': [
			2,
			'always',
		],
		'sort-vars': 2,
		'no-return-assign': 0,
	},
};
