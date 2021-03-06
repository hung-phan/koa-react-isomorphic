module.exports = {
  extends: ["airbnb", "prettier", "prettier/flowtype", "prettier/react"],
  parser: "babel-eslint",
  plugins: ["jest", "flowtype"],
  env: {
    "jest/globals": true,
    browser: true,
    node: true
  },
  rules: {
    quotes: [2, "double"],
    "comma-dangle": 0,
    "no-param-reassign": 0,
    "global-require": 0,
    "no-underscore-dangle": 0,
    "arrow-parens": 0,
    "jsx-a11y/href-no-hash": "off",
    "import/no-extraneous-dependencies": 0,
    "import/no-named-as-default": 0,
    "import/prefer-default-export": 0,
    "react/require-extension": 0,
    "react/prop-types": 0,
    "flowtype/define-flow-type": 1,
    "flowtype/space-after-type-colon": [1, "always"],
    "flowtype/space-before-type-colon": [1, "never"],
    "flowtype/type-id-match": [1, "^([A-Z][a-z0-9]+)+Type$"],
    "flowtype/use-flow-type": 1
  },
  settings: {
    "import/resolver": {
      webpack: {
        config: {
          resolve: {
            extensions: [".js", ".jsx"],
            modules: ["app", "node_modules"]
          }
        }
      }
    }
  }
};
