module.exports = {
	root: true,
	extends: ['eslint:recommended', 'prettier'],
	plugins: ['svelte3'],
	overrides: [{ files: ['*.svelte'], processor: 'svelte3/svelte3' }],
	parserOptions: {
		sourceType: 'module',
		ecmaVersion: 2020
	},
	settings: {
		
    'svelte3/ignore-warnings': (warning) => {
      return warning.code === 'a11y-click-events-have-key-events'
   	 },
  	},
	env: {
		browser: true,
		es2017: true,
		node: true
	}
};
