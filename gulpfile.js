'use strict';

var _         = require('lodash'),
    del       = require('del'),
    gulp      = require('gulp'),
    gutil     = require('gulp-util'),
    minimist  = require('minimist'),
    webpack   = require('webpack'),
    DevServer = require('webpack-dev-server'),
    notifier  = require('node-notifier'),
    shell     = require('shelljs'),
    pm2       = require('pm2'),
    config    = require('./config/config.json');

gulp.task('frontend:watch', shell.exec.bind(this, 'npm run frontend-dev'));
gulp.task('frontend:build', ['frontend:clean'], function(cb) {
  var bundler = webpack(
                  require('./config/environments/production/frontend.config')
                ),
      handler = function (err, stats) {
        if (err) {
          notifier.notify({ message: 'Error: ' + err.message });
          throw new gutil.PluginError('webpack', err);
        }
        gutil.log('[webpack]', stats.toString({colors: true}));
      };

  bundler.run(handler);
});

gulp.task('backend:watch', function(cb) {
  var started = false;

  webpack(
    require('./config/environments/development/backend.config')
  ).watch(100, function(err, stats) {
    if(!started) {
      started = true;
      cb();
    }

    gutil.log('[webpack]', stats.toString({colors: true}));
  });
});
gulp.task('backend:build', ['backend:clean'], function(done) {
  var bundler = webpack(
                  require('./config/environments/production/backend.config')
                ),
      handler = function (err, stats) {
        if (err) {
          notifier.notify({ message: 'Error: ' + err.message });
          throw new gutil.PluginError('webpack', err);
        }
        gutil.log('[webpack]', stats.toString({colors: true}));
      };

  bundler.run(handler);
});

gulp.task('clean', cleanTask([config.frontend.build, config.backend.build]));

gulp.task('start-server', function() {
  shell.exec('pm2 start build/server/index.js --name local-dev-server');
});

gulp.task('stop-server', function() {
  shell.exec('pm2 delete local-dev-server');
});

// clean task
function cleanTask(files) {
  return function() {
    del(files, function (err, paths) {
      gutil.log('Deleted files/folders:\n', gutil.colors.cyan(paths.join('\n')));
    });
  };
}
