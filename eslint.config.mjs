import unjs from 'eslint-config-unjs'

export default unjs({
  ignores: ['src/__generated__'],
  rules: {
    camelcase: ['off', { ignoreImports: true }],
  },
})
