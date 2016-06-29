'use strict';

const del = require('del');
const gulp = require('gulp');
const gutil = require('gulp-util');
const env = require('gulp-env');
const webpack = require('webpack');
const shell = require('shelljs');
const config = require('./config');

// clean task
const cleanTask = (files) => () => {
  del(files, (err, paths) => {
    gutil.log('Deleted files/folders:\n', gutil.colors.cyan(paths.join('\n')));
  });
};

gulp.task('clean', cleanTask([
  `.${config.path.build}`,
  `.${config.path.publicAssets}`,
]));

gulp.task('set-production-env', () => {
  env({
    vars: {
      NODE_ENV: 'production',
    },
  });
});

gulp.task('compile-templates', (done) =>
  shell.exec('npm run compile-templates', () => done())
);

gulp.task('frontend:watch', (done) =>
  shell.exec('npm run frontend:watch', () => done())
);

gulp.task('frontend:build', ['set-production-env'], (done) => {
  webpack(require('./config/webpack/client/production'))
    .run((err, stats) => {
      if (err) {
        throw new gutil.PluginError('webpack', err);
      }

      gutil.log('[webpack]', stats.toString({ colors: true }));
      done();
    });
});

gulp.task('backend:watch', (done) => {
  let started = false;

  webpack(require('./config/webpack/server/development'))
    .watch(100, (err, stats) => {
      if (!started) {
        started = true;
        done();
      }

      gutil.log('[webpack]', stats.toString({ colors: true }));
    });
});

gulp.task('backend:build', ['set-production-env'], (done) => {
  webpack(require('./config/webpack/server/production'))
    .run((err, stats) => {
      if (err) {
        throw new gutil.PluginError('webpack', err);
      }

      gutil.log('[webpack]', stats.toString({ colors: true }));
      done();
    });
});

gulp.task('build', ['clean', 'compile-templates', 'frontend:build', 'backend:build']);
