module.exports = {
    "env": {
        "browser": true,
        "es2021": true
    },
    "extends": "airbnb",
    "parserOptions": {
        "ecmaFeatures": {
            "jsx": true
        },
        "ecmaVersion": 12,
        "sourceType": "module"
    },
    "plugins": [
        "react"
    ],
  "rules": {
    // TODO: Remove when is https://github.com/babel/babel-eslint/issues/530 fixed
    "template-curly-spacing" : "off",
    "indent" : "off",
    //
    "max-len": ["error", 140, 2, {
      "ignoreUrls": true,
      "ignoreComments": false,
      "ignoreRegExpLiterals": true,
      "ignoreStrings": true,
      "ignoreTemplateLiterals": true
    }],
    "import/no-unresolved": "off",
    "class-methods-use-this": "off",
    "spaced-comment": "off",
    "no-plusplus": "off",
    "no-trailing-spaces": ["error", { "skipBlankLines": true }],
    "no-case-declarations": "off",
    "no-shadow": "off",
    "no-use-before-define": "off",
    "no-param-reassign": ["error", { "props": false }],
    "no-continue": "off",
    "no-restricted-syntax": "off",
    "import/prefer-default-export": "off",
    "object-curly-newline": ["error", {
      "ObjectExpression": { "minProperties": 8, "multiline": true, "consistent": true },
      "ObjectPattern": { "minProperties": 8, "multiline": true, "consistent": true },
      "ImportDeclaration": { "minProperties": 8, "multiline": true, "consistent": true },
      "ExportDeclaration": { "minProperties": 8, "multiline": true, "consistent": true }
    }],
    "operator-linebreak": ["error", "after", { "overrides": { "=": "none" } }],
    "lines-between-class-members": ["error", "always", { "exceptAfterSingleLine": true }],
    "react/prop-types": "off",
    "react/jsx-filename-extension": [1, { "extensions": [".tsx", ".jsx"] }],
    "react/require-default-props": "off",
    "react/no-unused-state": "warn",
    "react/forbid-prop-types": "off",
    "react/destructuring-assignment": "off",
    "react/button-has-type": "off",
    "react/jsx-props-no-spreading": "off",
    "react/static-property-placement": "off",
    "react/jsx-one-expression-per-line": "off",
    "react/state-in-constructor": "off",
    "jsx-a11y/anchor-is-valid": "off",
    "jsx-a11y/label-has-for": "off",
    "jsx-a11y/label-has-associated-control": "off",
    "jsx-a11y/click-events-have-key-events": "off",
    "jsx-a11y/no-static-element-interactions": "off"
  }

};
