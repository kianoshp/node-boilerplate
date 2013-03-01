require.config({
  // baseUrl: "js/libs",
  urlArgs: 'cb=' + Math.random(),
  paths: {
    jquery: '../js/libs/jquery',
    underscore: '../js/libs/lodash',
    backbone: '../js/libs/backbone',
    jasmine: 'jasmine-1.3.1/jasmine',
    'jasmine-html': 'jasmine-1.3.1/jasmine-html',
    spec: 'spec/'
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
    },
    'jasmine-html': {
      deps: ['jasmine'],
      exports: 'jasmine'
    }
  }
});

require(['underscore', 'jquery', 'jasmine-html'], function(_, $, jasmine){
  var jasmineEnv = jasmine.getEnv();
  jasmineEnv.updateInterval = 1000;
 
  var htmlReporter = new jasmine.HtmlReporter();
 
  jasmineEnv.addReporter(htmlReporter);
 
  jasmineEnv.specFilter = function(spec) {
    return htmlReporter.specFilter(spec);
  };
 
  var specs = [];
 
  specs.push('spec/views/LandingPageSpec'); 
 
  $(function(){
    require(specs, function(){
      jasmineEnv.execute();
    });
  });
 
});
