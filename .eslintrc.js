module.exports = {
  root: true,
  env: {
    node: true,
  },
  extends: ['plugin:vue/essential', 'eslint:recommended', 'plugin:prettier/recommended'], //"@vue/prettier"
  parserOptions: {
    parser: 'babel-eslint',
  },
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'prettier/prettier': [
      'warn',
      {
        singleQuote: true,
        printWidth: 100,
        tabWidth: 2,
        useTabs: false,
        semi: true,
        quoteProps: 'preserve',
        jsxSingleQuote: false,
        trailingComma: 'es5',
        arrowParens: 'always',
        endOfLine: 'auto',
        bracketSpacing: true,
        jsxBracketSameLine: false,
        requirePragma: false,
        insertPragma: false,
        proseWrap: 'preserve',
        vueIndentScriptAndStyle: false,
      },
    ],
  },
};
