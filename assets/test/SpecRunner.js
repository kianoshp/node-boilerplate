require.config({
  // baseUrl: "js/libs",
  urlArgs: 'cb=' + Math.random(),
  paths: {
    jquery: '../js/libs/jquery',
    underscore: '../js/libs/lodash',
    backbone: '../js/libs/backbone',
  },
  shim: {
    backbone: {
      deps: ['underscore', 'jquery'],
      exports: 'Backbone'
    },
      underscore: {
        exports: '_'
    },
    jasmine: {
      exports: 'jasmine'
    }
  }
});

require(['underscore', 'jquery'], function(_, $){
  console.log('I made it!');
});
