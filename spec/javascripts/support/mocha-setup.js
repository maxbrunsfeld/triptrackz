mocha.setup({
  ui: 'bdd',
  globals: ['csrf_token', 'csrf_param', 'XMLHttpRequest']
});
