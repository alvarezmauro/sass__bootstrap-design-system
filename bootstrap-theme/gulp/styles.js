/****************************************************************************** 
* CSS/SASS gulp tasks related
*
* @desc: Here are all the task related to the preparation, compilation and copy
* of the css files.
*
* @param {gulp}
* @param {config}
******************************************************************************/
module.exports = function(gulp, config) {
  'use strict';

  /************************************** 
  * Load external modules
  **************************************/

  // Load external modue "gulp-sourcemaps". Used to write inline source maps
  const sourcemaps = require('gulp-sourcemaps');

  // Load external modue "gulp-sass". Used to compile SASS to CSS
  const sass = require('gulp-sass');

  // Load external module "gulp-rename". Used to rename files easily.
  const rename = require('gulp-rename');

  // Load external module "gulp-concat"
  const concat = require('gulp-concat');

  // Load external module "merge-stream".
  const merge = require('merge-stream');

  /************************************** 
  * Gulp Tasks
  **************************************/

  var sassStreamBuild;
  var sassStreamCompile;
  var cssStream;

  cssStream = gulp.src(config.bootstrapDatepickerFolderPath + '/css/bootstrap-datepicker3.standalone.min.css');

  /**
   * @task: styles:build
   * @desc: compile all the sass files and copy them into the build folder
   */
  sassStreamBuild = gulp.src(['./scss/**/*.scss']) // get all the sass files in the "src" folder
    .pipe(sourcemaps.init()) // generate a sourcemap for each of them
    .pipe(sass({
      includePaths: config.bootstrapFolderPath + config.bootstrapFolderScssPath
    })
    .on('error', sass.logError)) // compile the SASS files
    .pipe(sourcemaps.write()); // write the corresponding sourcemap on each of them

  gulp.task('styles:build', () => {
    return merge(sassStreamBuild, cssStream)
      .pipe(concat(config.bootstrapThemeName + '.css'))
      .pipe(rename({
        basename: config.bootstrapThemeName
      }))
      .pipe(gulp.dest('./build/css/')); // move those files to the build folder (keeping folder structure)
  });

  /**
   * @task: styles:dist
   * @desc: compile all the sass files and copy them into the build folder
   */
  sassStreamCompile = gulp.src(['./scss/**/*.scss']) // get all the sass files in the "src" folder
    .pipe(sass({  // compile the SASS files and compress the result
      includePaths: config.bootstrapFolderPath + config.bootstrapFolderScssPath,
      outputStyle: 'compressed'
    }).on('error', sass.logError));

  gulp.task('styles:dist', () => {
    return merge(sassStreamCompile, cssStream)
      .pipe(concat(config.bootstrapThemeName + '.css'))
      .pipe(rename({
        basename: config.bootstrapThemeName,
        extname: ".min.css"
      }))
      .pipe(gulp.dest('./dist/css/')); // move those files to the build folder (keeping folder structure)
  });

  /**
   * @task: styles:src
   * @desc: 
   */
  gulp.task('styles:src', () => {
    return gulp.src([config.bootstrapFolderPath + config.bootstrapFolderScssPath + '/**/*.scss', './scss/**/*.scss']) // get all the sass files in the "src" folder
    .pipe(gulp.dest('./src/'))
  });

}