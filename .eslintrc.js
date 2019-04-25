module.exports = {
  parser: "@typescript-eslint/parser",
  extends: ["airbnb", "plugin:@typescript-eslint/recommended", "react-app"],
  plugins: ["@typescript-eslint", "react"],
  rules: {
    "@typescript-eslint/indent": ["error", 2]
  },
  overrides: [
    {
      // disable TS rules for `.js` files
      files: ["*.js"],
      rules: {
        "@typescript-eslint/no-var-requires": "off"
      }
    },
    {
      files: ["*.tsx"],
      rules: {
        "react/jsx-filename-extension": "off"
      }
    }
  ],
};
