module.exports = {
  parser: "@typescript-eslint/parser",
  extends: ["airbnb", "plugin:@typescript-eslint/recommended", "react-app"],
  plugins: ["@typescript-eslint", "react"],
  rules: {
    "@typescript-eslint/indent": ["error", 2],
    "@typescript-eslint/explicit-function-return-type": "off"
  },
  overrides: [
    {
      // disable TS rules for JS files
      files: ["*.js"],
      rules: {
        "@typescript-eslint/no-var-requires": "off"
      }
    },
    {
      // disable JS rules for TS files
      files: ["*.tsx"],
      rules: {
        "react/jsx-filename-extension": "off"
      }
    }
  ],
  settings: {
    "import/resolver": {
      node: {
        paths: ["src"],
        extensions: [".js", ".jsx", ".ts", ".tsx"]
      }
    },
  },
};
