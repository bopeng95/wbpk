const prettierIgnore = `build/
node_modules/
package-lock.json
package.json 
`;

const prettier = `{
  "printWidth": 80,
  "tabWidth": 2,
  "useTabs": false,
  "semi": true,
  "singleQuote": true,
  "trailingComma": "all"
}
`;

const eslint = `{
  "parser": "babel-eslint",
  "extends": ["airbnb", "prettier", "prettier/react"],
  "plugins": ["prettier"],
  "env": {
    "browser": true,
    "node": true
  },
  "rules": {
    "prettier/prettier": ["error"],
    "react/jsx-filename-extension": 0,
    "import/prefer-default-export": 0,
    "react/jsx-props-no-spreading": 0,
    "react/prop-types": 0,
    "no-param-reassign": 0,
    "import/no-extraneous-dependencies": 0
  },
  "settings": {
    "import/resolver": {
      "node": {
        "paths": ["node_modules", "src"]
      },
      "webpack": {
        "config": "webpack.common.js"
      },
      "env": {
        "NODE_ENV": "local"
      }
    }
  }
}
`;

module.exports = {
  prettierIgnore,
  prettier,
  eslint,
};
