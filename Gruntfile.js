'use strict';

module.exports = function(grunt) {

  require('load-grunt-tasks')(grunt);

  var path = require('path');

  /**
   * Resolve external project resource as file path
   */
  function resolvePath(project, file) {
    return path.join(path.dirname(require.resolve(project)), file);
  }

  // project configuration
  grunt.initConfig({

    browserify: {
      options: {
        transform: [ 'brfs' ]
      },
      watch: {
        options: {
          watch: true
        },
        files: {
          'dist/index.js': [ 'app/index.js' ]
        }
      },
      app: {
        files: {
          'dist/index.js': [ 'app/index.js' ]
        }
      }
    },
    copy: {
      bpmn_js: {
        files: [
          {
            expand: true,
            cwd: resolvePath('bpmn-js', 'dist/assets'),
            src: ['**/*.*', '!**/*.js'],
            dest: 'dist/vendor'
          }
        ]
      },
      app: {
        files: [
          {
            expand: true,
            cwd: 'app/',
            src: ['**/*.*', '!**/*.js', '!**/*.bpmn'],
            dest: 'dist'
          }
        ]
      },
      colors: {
        files: [
          {
            expand: true,
            cwd: 'colors/',
            src: ['**/*.css'],
            dest: 'dist/vendor/colors'
          }
        ]
      }
    },
    watch: {
      options: {
        livereload: true
      },
      app: {
        files: [ 'app/**/*.*' ],
        tasks: [ 'copy:app' ]
      },
      colors: {
        files: [ 'colors/**/*.*' ],
        tasks: [ 'copy:colors' ]
      }
    },
    connect: {
      livereload: {
        options: {
          port: 9013,
          livereload: true,
          hostname: 'localhost',
          open: true,
          base: [
            'dist'
          ]
        }
      }
    }
  });

  // tasks

  grunt.registerTask('build', [ 'copy', 'browserify:app' ]);

  grunt.registerTask('auto-build', [
    'copy',
    'browserify:watch',
    'connect:livereload',
    'watch'
  ]);

  grunt.registerTask('default', [ 'build' ]);
};
