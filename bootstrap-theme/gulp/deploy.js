/****************************************************************************** 
* Gulp tasks related to Deployment
*
* @desc: 
*
* @param {gulp}
* @param {config}
******************************************************************************/
module.exports = function(gulp, config) {
  'use strict';

  /**************************************
  * Load external modules
  **************************************/

  // Load external module "gulp-archiver". Used to compress the files into a zip
  const archiver = require('gulp-archiver');

  // Load external module "gulp-rename". Used to rename files easily.
  const rename = require('gulp-rename');

  // Load external module "del". Used to delete files from the filesystem.
  const del = require('del');

  const pxml = require('pxml').PackageXML;
  const file = require('gulp-file');
  const merge = require('merge-stream');
  
  // Load external modue "gulp-jsforce-deploy". Used for deploy files to Salesforce
  const forceDeploy = require('gulp-jsforce-deploy');

  // Load external modue "gulp-uglify". Used for code obfuscation
  const uglify = require('gulp-uglify');

  /************************************** 
  * Gulp Tasks
  **************************************/

  // Variable with the value of the XML metadata used for Salesforce static resources
  let resourceMetaXml = `<?xml version="1.0" encoding="UTF-8"?>
<StaticResource xmlns="http://soap.sforce.com/2006/04/metadata">
    <cacheControl>Public</cacheControl>
    <contentType>application/octet-stream</contentType>
</StaticResource>`;

  /**
   * @task: clean-tmp
   * @desc: Delete ".tmp" folder
   */
  gulp.task('clean-tmp', () => {
    return del(['.tmp']);
  });

  /**
   * @task: clean-prod
   * @desc: Delete ".prod" folder
   */
  gulp.task('clean-dist', () => {
    return del(['.dist']);
  });

  /**
   * @task: clean-build
   * @desc: Delete ".build" folder
   */
  gulp.task('clean-build', () => {
    return del(['build']);
  });

  /**
   * @task: clean-resources
   * @desc: Delete ".tmp/static_resources" folder
   */
  gulp.task('clean-resources', () => {
    return del(['.tmp/static_resources']);
  });

  /**
   * @task: init-deploy
   * @desc: execute task "clean-tmp" and "clean-build", after that, execute in
   * parallel the tasks "scripts:dist" and "styles:dist"
   */
  gulp.task('init-deploy', gulp.series(
    'clean-tmp',
    'clean-dist',
    gulp.parallel('scripts:dist', 'styles:dist')
  ));

  /**
   * @task: tempgen:node_modules (used to prepare the ZIP package to upload to Salesforce)
   * @desc: Copy all the node modules used in the app in the folder 
   * ".tmp/static_resources/${config.resources.node_module_resource_name}"
   */
  gulp.task('package:files', () => {
    return gulp.src([
      'dist/*/*.*'
    ])
      .pipe(gulp.dest('.tmp/static_resources/' + config.bootstrapThemeName));
  });

/**
   * @task: package:node_modules (used create the ZIP package to upload to Salesforce)
   * @desc: create a ZIP package with all the static resources (.tmp/static_resources/) in ".tmp" folder. 
   * Change the package extension to ".resource" and put the file in the folder ".tmp/staticresources"
   */
  gulp.task('package:compress', () => {
    return gulp.src('.tmp/static_resources/' + config.bootstrapThemeName + '/**/*.*', {
      base: '.tmp/static_resources/' + config.bootstrapThemeName
    })
      .pipe(archiver(config.salesforceZipFileName + '.zip'))
      .pipe(rename({
        extname: '.resource'
      }))
      .pipe(gulp.dest('.tmp/staticresources'));
  });

  /**
   * @task: package:pxml (used create the ZIP package to upload to Salesforce)
   * @desc: Create a pxml file for the folder '.tmp' and put it inside of the same folder
   */
  gulp.task('package:pxml', () => {
    return file('package.xml', pxml.from_dir('.tmp').generate().to_string(), { src: true })
      .pipe(gulp.dest('.tmp'));
  });

  /**
   * @task: tempgen:meta-xml (used create the ZIP package to upload to Salesforce)
   * @desc: Create a pxml file for the folder '.tmp' and put it inside of the same folder
   */
  gulp.task('package:meta-xml', () => {
    let resources = file(config.salesforceZipFileName + '.resource-meta.xml',
        resourceMetaXml, { src: true })
      .pipe(gulp.dest('.tmp/staticresources'));

    return resources;
  });
   
  gulp.task('package-template', gulp.series(
    'init-deploy',
    'package:files',
    'package:compress',
    'clean-resources',
    'package:pxml',
    'package:meta-xml',
    'clean-dist'
  ));

  /**
   * @task: deploy:jsforce (used create the ZIP package to upload to Salesforce)
   * @desc: compress the tmp folder into a zip file calles "pkg.zip" and upload it to salesforce
   */
  gulp.task('deploy:jsforce', () => {
    return gulp.src('.tmp/**/*', { base: '.' })
    .pipe(archiver('pkg.zip'))
    .pipe(forceDeploy({
      username: config.deploy.username,
      password: config.deploy.password,
      loginUrl: config.deploy.login_url,
      version: config.deploy.api_version,
      checkOnly: process.env.CHECK_ONLY,
      pollTimeout: config.deploy.timeout,
      pollInterval: config.deploy.poll_interval
    }));
  });

  /**
   * @task: deploy
   * @desc: create a .tmp folder with all the files of the project to upload to salesforce, compress that folder
   * and upload it to salesforce
   */
  gulp.task('deploy', gulp.series('package-template', 'deploy:jsforce'));

}
