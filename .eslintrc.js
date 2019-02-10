module.exports = {
  rules: {
    'init-declarations': ['error', 'always'],
    'max-len': ['error', 100,
      { 'ignoreRegExpLiterals': true,
        'ignoreStrings': true,
        'ignoreTemplateLiterals': true,
        'ignoreUrls': true, }],
    'no-undefined': 'error',
  },
  extends: 'airbnb-base',
};
