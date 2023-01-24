module.exports = (options) => ({
  ...options,
  output: {
    ...options.output,
    libraryTarget: 'commonjs2',
  },
});
