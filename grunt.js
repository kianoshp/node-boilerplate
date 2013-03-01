/*global module:false*/
module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    pkg: '<json:package.json>',
    meta: {
      banner: '/*! <%= pkg.title || pkg.name %> - v<%= pkg.version %> - ' +
        '<%= grunt.template.today("yyyy-mm-dd") %>\n' +
        '<%= pkg.homepage ? "* " + pkg.homepage + "\n" : "" %>' +
        '* Copyright (c) <%= grunt.template.today("yyyy") %> <%= pkg.author.name %>;' +
        ' Licensed <%= _.pluck(pkg.licenses, "type").join(", ") %> */'
    },
    project: {
      js: 'static/js',
      css: 'static/css',
      images: 'static/images',
      test: 'static/test',
      randomNumber: '<%= Math.random() * 1000 %>'
    },
    lint: {
      files: ['grunt.js', '<%= project.js %>/**/*.js', '<%= project.test %>/spec/**/*.js']
    },
    jasmine: {
      amd: true,
      src : ['static/test/**/*.js', 'static/test/*.js'],
      specs : 'static/test/spec/**/*.js',
      helpers: ['static/js/libs/require.js', 'static/js/config.js']
    },
    concat: {
      dist: {
        src: ['<%= project.js %>/*.js'],
        dest: 'dist/concatenatedJS.js'
      }
    },
    min: {
      dist: {
        src: ['<config:concat.dist.dest>'],
        dest: 'dist/<%= project.randomNumber %>.js'
      }
    },
    watch: {
      files: '[<config:lint.files>, <config:jasmine.specs>]',
      tasks: 'lint jasmin-test'
    },
    jshint: {
      options: {
        curly: true,
        eqeqeq: true,
        immed: true,
        latedef: true,
        newcap: true,
        noarg: true,
        sub: true,
        undef: true,
        boss: true,
        eqnull: true,
        browser: true
      },
      globals: {
        jQuery: true,
        require: true,
        define: true,
        describe: true,
        it: true,
        expect: true,
        runs: true,
        waitsFor: true,
        $: true,
        console: true
      }
    },
    uglify: {}
  });

  //Register tasks
  grunt.loadNpmTasks('grunt-jasmine-runner');

  // Default task
  grunt.registerTask('default', 'lint concat jasmine-test');
  grunt.registerTask('build', 'lint concat min');
  grunt.registerTask('jasmine-test', 'jasmine');

};
