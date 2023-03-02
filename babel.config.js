/** @type {babel.ConfigFunction} */
module.exports = (api) => {
  api.cache(true)

  return {
    presets: [
      ['@babel/preset-env', { loose: true }],
      '@babel/preset-typescript',
    ],
  }
}
