module.exports = {
  "parser": "@babel/eslint-parser",
  "parserOptions": {
    "ecmaVersion": 2020,
    "babelOptions": {
      "presets": ["@babel/preset-react"]
    },
  },
  "extends": [
    "eslint:recommended",
    "plugin:react/recommended",
    "plugin:jest/recommended"
  ],
  "env": {
    "browser": true,
    "amd": true,
    "node": true,
    "es6": true,
    "jest": true,
  }
};
