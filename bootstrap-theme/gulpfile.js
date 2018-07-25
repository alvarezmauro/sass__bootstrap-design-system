'use strict';

const gulp = require('gulp');
const fs = require('fs');

let config = require('./gulp/config');

// All tasks are located in other files within the gulp folder
require('./gulp/scripts')(gulp, config);
require('./gulp/styles')(gulp, config);
require('./gulp/deploy')(gulp, config);

gulp.task('build', gulp.series('scripts:build', 'styles:build', 'styles:src'));
gulp.task('dist', gulp.series('scripts:dist', 'styles:dist', 'styles:src'));

/**
 * @task: watch:build
 * @desc: execute "build" task if there is any changes in the SASS files in the folder "scss"
 */
gulp.task('watch:build', () => {
  gulp.watch('scss/**/*.scss', gulp.series('build'))
});

/**
 * @task: watch-build
 * @desc: execute 'build' task and then watch executing the task 'watch:build'
 */
gulp.task('watch-build', gulp.series('build', 'watch:build'));

/**
 * @task: watch:dist
 * @desc: execute "dist" task if there is any changes in the SASS files in the folder "scss"
 */
gulp.task('watch:dist', () => {
  gulp.watch('scss/**/*.scss', gulp.series('dist'))
});

/**
 * @task: watch-dist
 * @desc: execute 'dist' task and then watch executing the task 'watch:dist'
 */
gulp.task('watch-dist', gulp.series('dist', 'watch:dist'));

/**
 * @task: watch:deploy
 * @desc: execute "deploy" task if there is any changes in the SASS files in the folder "scss"
 */
gulp.task('watch:deploy', () => {
  gulp.watch('scss/**/*.scss', gulp.series('deploy'))
});

/**
 * @task: watch-deploy
 * @desc: execute 'deploy' task and then watch executing the task 'watch:deploy'
 */
gulp.task('watch-deploy', gulp.series('deploy', 'watch:deploy'));

gulp.task('default', gulp.series('watch-build'));
gulp.task('watch', gulp.series('watch-build'));
