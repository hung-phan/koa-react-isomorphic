/*
 * @author Hung Quang Phan
 *
 * Development config
 */

var _        = require('lodash'),
    config   = require('./config.json'),
    del      = require('del'),
    gulp     = require('gulp'),
    gutil    = require('gulp-util'),
    minimist = require('minimist'),
    webpack  = require('webpack'),
    notifier = require('node-notifier');

// clean task
gulp.task('javascript:clean', function () {
  del([config.webpack.build], function (err, paths) {
    gutil.log(
      'Deleted files/folders:\n',
      gutil.colors.cyan(paths.join('\n'))
    );
  });
});

// watch task
gulp.task('javascript:dev', ['javascript:clean'], function (cb) {
  var started = false,
      bundler = webpack(require('./development.config.js')),
      bundle  = function (err, stats) {
        if (err) {
          notifier.notify({ message: 'Error: ' + err.message });
          throw new gutil.PluginError('webpack', err);
        }
        gutil.log('[webpack]', stats.toString({colors: true}));
        if (!started) {
          started = true;
          return cb();
        }
      }

  bundler.watch(200, bundle);
});

// build task
gulp.task('javascript:build', ['javascript:clean'], function(cb) {
  var started = false,
      bundler = webpack(require('./production.config.js')),
      bundle  = function (err, stats) {
        if (err) {
          notifier.notify({ message: 'Error: ' + err.message });
          throw new gutil.PluginError('webpack', err);
        }
        gutil.log('[webpack]', stats.toString({colors: true}));
        if (!started) {
          started = true;
          return cb();
        }
      }

  bundler.run(bundle);
});
