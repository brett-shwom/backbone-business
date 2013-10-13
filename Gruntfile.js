module.exports = function(grunt) {
  grunt.initConfig({
    jasmine: {
      "backbone-business" : {
        src: [
          'backbone-business-rule-processor.js',
          'backbone-business.js'
        ],
        options: {
          specs: 'test/spec/*Spec.js',
          helpers: 'test/spec/*Helper.js',
          vendor:[
            'lib/jquery/jquery.js',
            'lib/underscore/underscore.js',
            'lib/backbone/backbone.js'
          ]
        }
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-jasmine');

  grunt.registerTask('test', ['jasmine:backbone-business']);

};
