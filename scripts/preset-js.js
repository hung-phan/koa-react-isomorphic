module.exports = {
  presets: [
    ['babel-preset-env', {
      targets: {
        browsers: ['last 2 versions', 'safari >= 7']
      },
      modules: process.env.RUN_MODE === 'es' ? false : 'commonjs'
    }],
  ],
};
