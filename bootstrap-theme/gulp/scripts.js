/****************************************************************************** 
* JS/TypeScript gulp tasks related
*
* @desc: Here are all the task related to the preparation, compilation and copy
* of the ts and js files.
*
* @param {gulp}
* @param {config}
******************************************************************************/
module.exports = function(gulp, config) {
  'use strict';

  // Load external module "gulp-rename". Used to rename files easily.
  const rename = require('gulp-rename');
  const concat = require('gulp-concat');
  
  var jsFiles = '';
  var jsFilesMin = '';

  if(!config.cssOnly){
    jsFiles = [
      config.jqueryFolderPath + '/dist/jquery.js',
      config.popperFolderPath + '/dist/umd/popper.js',
      config.bootstrapFolderPath + config.bootstrapFolderJsPath,
      config.momentFolderPath + '/src/moment.js',
      config.bootstrapDatepickerFolderPath + '/js/bootstrap-datepicker.js'
    ];
    
    jsFilesMin = [
      config.jqueryFolderPath + '/dist/jquery.min.js',
      config.popperFolderPath + '/dist/umd/popper.min.js',
      config.bootstrapFolderPath + '/dist/js/*.min.js',
      config.momentFolderPath + '/min/moment.min.js',
      config.bootstrapDatepickerFolderPath + '/js/bootstrap-datepicker.min.js'
    ];
  }

  /**
   * @task: scripts:build
   * @desc: copy the JS file "bootstrap/dist/js/bootstrap.js" to the "build/js/" folder
   */
  gulp.task('scripts:build', () => {
    if(!config.cssOnly){
      return gulp.src(jsFiles)
        .pipe(concat(config.bootstrapThemeName + '.js'))
        .pipe(gulp.dest('./build/js/'))
    } else {
      return new Promise(function(resolve, reject) {
        console.log("Compile SCSS to CSS only");
        resolve();
      });
    }
  });

  /**
   * @task: scripts:dist
   * @desc: copy the JS files from the folder "bootstrap/dist/js/" to the "dist/js/" folder
   */
  gulp.task('scripts:dist', () => {
    if(!config.cssOnly){
      return gulp.src(jsFilesMin)
        .pipe(concat(config.bootstrapThemeName + '.min.js'))
        .pipe(gulp.dest('./dist/js/'))
    } else {
      return new Promise(function(resolve, reject) {
        console.log("Compile SCSS to CSS only");
        resolve();
      });
    }
  });

}