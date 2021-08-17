module.exports = {
  root: true,

  env: {
    node: true,
  },

  parserOptions: {
    parser: "babel-eslint",
  },

  rules: {
    "no-console": "off",
    "no-debugger": "off",
    "vue/valid-v-html": "off",
    "vue/no-v-html": "off",
  },

  extends: ["plugin:vue/recommended", "eslint:recommended", "@vue/prettier"],
};
