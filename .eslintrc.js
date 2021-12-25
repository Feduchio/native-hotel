module.exports = {
  root: true,
  env: {
    browser: true,
    es2021: true,
  },
  extends: [
    "plugin:react/recommended",
    "airbnb",
    "airbnb-typescript",
    "@react-native-community",
    "eslint-config-silence",
    "silence/react",
    "airbnb",
    "airbnb-typescript",
  ],
  overrides: [
    {
      files: ["*.ts", "*.tsx"],
      parserOptions: {
        project: ["./tsconfig.json"],
      },
    },
  ],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    project: "./tsconfig.json",
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 12,
    sourceType: "module",
  },
  plugins: ["@typescript-eslint", "import", "react"],
  ignorePatterns: ["__oldSrc/**", "/**/*.d.ts", "/*.*"],
  settings: {
    "import/extensions": [".js", ".jsx", ".ts", ".tsx"],
    "import/parsers": {
      "@typescript-eslint/parser": [".ts", ".tsx"],
    },
    "import/resolver": {
      node: {
        extensions: [".js", ".jsx", ".ts", ".tsx"],
      },
      typescript: {
        alwaysTryTypes: true,
      },
    },
  },
  rules: {
    "react/react-in-jsx-scope": "off",
    "global-require": "off",
    "no-use-before-define": "off",
    "react/jsx-filename-extension": "off",
    "react/prop-types": "off",
    "comma-dangle": "off",
    "no-unused-expressions": "off",
    "no-underscore-dangle": "off",
    "func-names": "off",
    "import/extensions": "off",
    "import/no-cycle": "off",
    "import/no-unresolved": "off",
    "import/no-extraneous-dependencies": "off",
    "react/jsx-props-no-spreading": "off",
    "no-shadow": "off",
    "no-plusplus": ["error", { allowForLoopAfterthoughts: true }],
    "max-len": ["error", { code: 150 }],
    "@typescript-eslint/no-use-before-define": ["warn", { variables: false }],
    "react-native/no-inline-styles": "off",
    "prettier/prettier": 0,
    "react-hooks/exhaustive-deps": "off",
  },
};
