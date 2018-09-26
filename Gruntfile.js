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
          'example/app.bundled.js': [ 'example/app.js' ]
        }
      },
      app: {
        files: {
          'example/app.bundled.js': [ 'example/app.js' ]
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
            dest: 'example/vendor'
          }
        ]
      },
      colors: {
        files: [
          {
            expand: true,
            cwd: 'colors/',
            src: ['**/*.css'],
            dest: 'example/vendor/colors'
          }
        ]
      }
    },
    watch: {
      options: {
        livereload: true
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
            'example'
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
