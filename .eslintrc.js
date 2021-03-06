module.exports = {
  "parser": "babel-eslint",

  "plugins": ["react"],

  "extends": [
    "eslint:recommended", 
    "plugin:react/recommended"
  ],

  "parserOptions": {
    "ecmaVersion": 2018,
    "sourceType": "module",
    "ecmaFeatures": {
      "jsx": true
    }
  },

  "env": {
    "browser": true,
    "node": true,
    "es6": true,
    "mocha": true
  },

  "ecmaFeatures": {},
  
  "rules": {
    "no-console": "warn",
    "eqeqeq": "error",
    "no-alert": "warn",
    "no-eval": "error",
    "semi": [
      "error", "always"
    ],
    "strict": "error",
    "no-unused-vars": [
      "error", {
        "vars": "all",
        "args": "none",
        "ignoreRestSiblings": false
      }
    ]
  }
};