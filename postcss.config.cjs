module.exports = {
  plugins: {
    'postcss-import': {},
    'postcss-preset-env': {},
    ...(process.env.NODE_ENV === 'production' ? { cssnano: {} } : {}),
  },
}
