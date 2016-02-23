require.config({
  baseUrl: '../bower_components',

  // use packages to be able to use relative paths
  packages: [
    {
      name: 'utiljs', // used for mapping...
      location: './', // relative to base url
      main: 'utiljs/src/js/utiljs'
    }
  ]
});
