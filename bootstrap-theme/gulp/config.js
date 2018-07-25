module.exports = {
  // Bootstrap folder path
  bootstrapFolderPath: './node_modules/bootstrap',
  bootstrapFolderScssPath: '/scss',
  bootstrapFolderJsPath: '/dist/js/bootstrap.js',
  bootstrapThemeName: 'bootstrapTheme', // Do not change
  salesforceZipFileName: 'BootstrapThemeDefault',

  // If we want to generate the CSS only, set the following value to "true"
  cssOnly: false,

  // jQuery folder path
  jqueryFolderPath: './node_modules/jquery',

  // Popper folder path
  popperFolderPath: './node_modules/popper.js',

  // Moment folder path
  momentFolderPath: './node_modules/moment',

  // Bootstrap-Datepicker folder path
  bootstrapDatepickerFolderPath: './node_modules/bootstrap-datepicker/dist',

  // Salesforce connection configuration
  deploy: {
    username: 'test@test.com', // Your SF user
    password: 'pass', // Your SF password
    login_url: 'https://test.salesforce.com',
    api_version: 36.0,
    timeout: 120000,
    poll_interval: 5000,
  },
}