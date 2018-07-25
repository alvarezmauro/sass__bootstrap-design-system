# Bootstrap Design System

## OVERVIEW
This project was created to speed up the front-end development and standardize the look and feel (style-guide) and UI patterns across our products.

In this repository you will find two folders:
* **bootstrap-theme**: contains bootstrap theme using the default look and feel.
* **doc**: website with the documentation related to the Bootstrap theme. In this site you will find the style guide, code examples and the patterns library.

## How to customize the bootstrap theme?
First of all, you need to install node.
[Download Node.js](https://nodejs.org/en/download/)

Once you have node installed, go to your `bootstrap-theme` folder and install all the node dependencies:
```
cd bootstrap-theme
npm install
```

Now you can easily customize the bootstrap framework by modifying the file `/bootstrap-theme/scss/bootstrap-theme.scss`. 
This file will look like this:
```scss
@import "functions";
@import "variables";
@import "mixins";
@import "print";
@import "reboot";
@import "type";
@import "images";
@import "code";
@import "grid";
@import "tables";
@import "forms";
@import "buttons";
@import "transitions";
@import "dropdown";
@import "button-group";
@import "input-group";
@import "custom-forms";
@import "nav";
@import "navbar";
@import "card";
@import "breadcrumb";
@import "pagination";
@import "badge";
@import "jumbotron";
@import "alert";
@import "progress";
@import "media";
@import "list-group";
@import "close";
@import "modal";
@import "tooltip";
@import "popover";
@import "carousel";
@import "utilities";
```
As you can see we are importing quite a lot of SCSS files. Those are all the necessary files to create a bootstrap theme and they are located in `/bootstrap-theme/node_modules/bootstrap/scss`.
Now, If you want to modify any of them, **_DON’T MODIFY THE ORIGINAL ONE_**, just copy and paste the file from `/bootstrap-theme/node_modules/bootstrap/scss` into `/bootstrap-theme/scss/`. At the moment of compilation, the file that is located in the folder `/bootstrap-theme/scss/` will take priority.

## How to compile the bootstrap theme? ##

### Configuration ###
The configuration file (`/bootstrap-theme/gulp/config.js`) is used to specify the path to the Bootstrap 4 npm package, the theme name and the settings to connect to your salesforce environment (used to deploy this bootstrap theme to your salesforce instance).

### Gulp Tasks ###
There are a collection of gulp task that you can run to compile `/bootstrap-theme/scss/bootstrap-theme.scss`.

#### Build Tasks ####
```
gulp build
```
* Will create a the `/bootstrap-theme/build` folder
* Compile the `/bootstrap-theme/scss/bootstrap-theme.scss` file and save the result in `/bootstrap-theme/build/css/(bootstrapThemeName).css`
* Copy and rename the JS file `/bootstrap-theme/node_modules/bootstrap/dist/js/bootstrap.min.js` to `/bootstrap-theme/build/js/(bootstrapThemeName).min.js`


```
gulp
```
```
gulp watch-build
```
* Will run the gulp task “build” 
* Watch the scss files in the folder `/bootstrap-theme/scss/`, if any changes are saved in those files, the gulp task “build” will be executed again.

#### Distribution Tasks ####
```
gulp dist
```
* Will create a the `/bootstrap-theme/dist` folder
* Compile and minify the `/bootstrap-theme/scss/bootstrap-theme.scss` file and save the result in `/bootstrap-theme/dist/css/(bootstrapThemeName).min.scss`
* Copy and rename the JS file `/bootstrap-theme/node_modules/bootstrap/dist/js/bootstrap.min.js` to `/bootstrap-theme/dist/js/(bootstrapThemeName).min.js`

```
gulp watch-dist
```
* Will run the gulp task “dist” 
* Watch the scss files in the folder `/bootstrap-theme/scss/`, if any changes are saved in those files, the gulp task “dist” will be executed again.

#### Deployment Tasks ####
```
gulp deploy
```
* Will execute the gulp task "dist"
* Create a salesforce compatible version of the dist folder and save it in the '.tmp' folder
* zip the content of '.tmp' folder and upload that file to salesforce


```
gulp watch-deploy
```
* Will run the gulp task “deploy” 
* Watch the scss files in the folder `/bootstrap-theme/scss/`, if any changes are saved in those file, the gulp task “deploy” will be executed again.
