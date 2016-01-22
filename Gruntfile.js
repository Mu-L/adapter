'use strict';

/* For jshint: */
/* globals module, require */

module.exports = function(grunt) {
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    browserify: {
      adapterGlobalObject: {
        src: ['src/js/adapter_core.js'],
        dest: 'out/adapter.js',
        options: {
          // alias: {
          //   'chrome_shim': './src/js/chrome/chrome_shim.js',
          //   // 'edge_shim': './src/js/edge/edge_shim.js',
          //   // 'edge_sdp': './src/js/edge/edge_sdp.js',
          //   // 'firefox_shim': './src/js/firefox/firefox_shim.js',
          //   'utils': './src/js/utils.js'
          // },
          browserifyOptions: {
            // Exposes shim methods in a global object to the browser.
            // The tests require this.
            // TODO: Replace adapter with <%= pkg.name %>' which uses the name
            // from package.json once we have a better NPM name.
            standalone: 'adapter'
          }
        }
      },
      // Use this if you do not want adapter to expose anything to the global
      // scope.
      adapterAndNoGlobalObject: {
        src: ['src/js/adapter_core.js'],
        dest: 'out/adapter_no_global.js',
        options: {
          alias: {
            'utils': './src/js/utils.js',
            'chrome_shim': './src/js/chrome/chrome_shim.js',
            'edge_shim': './src/js/edge/edge_shim.js',
            'edge_sdp': './src/js/edge/edge_sdp.js',
            'firefox_shim': './src/js/firefox/firefox_shim.js'
          }
        }
      },
      // Use this if you do not want MS edge shim to be included.
      adapterNoEdge: {
        src: ['src/js/adapter_core.js'],
        dest: 'out/adapter_no_edge.js',
        options: {
          // These files will be skipped.
          ignore: [
            './src/js/edge/edge_shim.js',
            './src/js/edge/edge_sdp.js'
          ],
          browserifyOptions: {
            // Exposes the shim in a global object to the browser.
            // The tests require this.
            // TODO: Replace adapter with <%= pkg.name %>' which uses the name
            // from package.json once we have a better NPM name.
            standalone: 'adapter'
          }
        }
      },
      // Use this if you do not want MS edge shim to be included and do not
      // want adapter to expose anything to the global scope.
      adapterNoEdgeAndNoGlobalObject: {
        src: ['src/js/adapter_core.js'],
        dest: 'out/adapter_no_edge_no_global.js',
        options: {
          ignore: [
            './src/js/edge/edge_shim.js',
            './src/js/edge/edge_sdp.js'
          ],
        }
      },
    },
    githooks: {
      all: {
        'pre-commit': 'jshint jscs'
      }
    },
    jshint: {
      options: {
        jshintrc: '.jshintrc'
      },
      files: ['adapter_core.js', 'test/*.js']
    },
    jscs: {
      src: ['adapter_core.js', 'test/*.js'],
      options: {
        config: '.jscsrc',
        'excludeFiles': [
        ]
      }
    },
    testling: {
      files: 'test/test.js'
    }
  });

  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-jscs');
  grunt.loadNpmTasks('grunt-githooks');
  grunt.loadNpmTasks('grunt-browserify');
  grunt.registerTask('default', ['jshint', 'jscs', 'browserify']);
};
