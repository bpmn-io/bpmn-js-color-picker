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
    pkg: grunt.file.readJSON('package.json'),

    config: {
      demoSources: 'app',
      sources: 'colors',
      dist: 'dist'
    },

    jshint: {
      src: [
        '<%=config.demoSources %>',
        '<%=config.sources %>'
      ],
      options: {
        jshintrc: true
      }
    },

    browserify: {
      options: {
        browserifyOptions: {
          // make sure we do not include browser shims unnecessarily
          builtins: false,
          debug: true,
          insertGlobalVars: {
            process: function() {
              return 'undefined';
            },
            Buffer: function() {
              return 'undefined';
            }
          }
        },
        transform: [ 'brfs' ]
      },
      watch: {
        options: {
          watch: true
        },
        files: {
          '<%= config.dist %>/index.js': [ '<%= config.demoSources %>/index.js' ]
        }
      },
      app: {
        files: {
          '<%= config.dist %>/index.js': [ '<%= config.demoSources %>/index.js' ]
        }
      }
    },
    copy: {
      diagram_js: {
        files: [
          {
            src: resolvePath('diagram-js', 'assets/diagram-js.css'),
            dest: '<%= config.dist %>/vendor/diagram-js.css'
          }
        ]
      },
      bpmn_js: {
        files: [
          {
            expand: true,
            cwd: resolvePath('bpmn-js', 'assets'),
            src: ['**/*.*', '!**/*.js'],
            dest: '<%= config.dist %>/vendor'
          }
        ]
      },
      app: {
        files: [
          {
            expand: true,
            cwd: '<%= config.demoSources %>/',
            src: ['**/*.*', '!**/*.js', '!**/*.bpmn'],
            dest: '<%= config.dist %>'
          }
        ]
      },
      colors: {
        files: [
          {
            expand: true,
            cwd: '<%= config.sources %>/',
            src: ['**/*.css'],
            dest: '<%= config.dist %>/vendor/colors'
          }
        ]
      }
    },
    watch: {
      options: {
        livereload: true
      },
      app: {
        files: [ '<%= config.demoSources %>/**/*.*' ],
        tasks: [ 'copy:app' ]
      },
      colors: {
        files: [ '<%= config.sources %>/**/*.*' ],
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
            '<%= config.dist %>'
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

  grunt.registerTask('default', [ 'jshint', 'build' ]);
};
