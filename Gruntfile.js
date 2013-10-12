module.exports = function(grunt) {
  grunt.initConfig({
    jasmine: {
      "backbone-business" : {
        src: ['backbone-business.js'],
        options: {
          specs: 'test/spec/*Spec.js',
          helpers: 'test/spec/*Helper.js',
          vendor:[
            'lib/jquery.js',
            'lib/underscore.js',
            'lib/backbone.js',
          ]
        }
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-jasmine');

  grunt.registerTask('test', ['jasmine:backbone-business']);

};
