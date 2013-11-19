module.exports = function(grunt) {

  grunt.loadNpmTasks('grunt-jscoverage'); 
  grunt.loadNpmTasks('grunt-cafe-mocha');
  grunt.loadNpmTasks('grunt-env');

  grunt.initConfig({
    env: {
        test: { NODE_ENV: 'TEST' },
        coverage: { NODE_ENV: 'COVERAGE' }
    },
    cafemocha: {
      test: {
          src: 'test/*.js',
          options: {
              ui: 'bdd',
              reporter: 'spec',
          },
      },
      coverage: {
         src: 'test/*.js',
          options: {
            ui: 'bdd',
            reporter: 'html-cov',
            coverage: {
                output: 'coverage.html'
            }
          }
      },
    },
    jscoverage: {
      options: {
        inputDirectory: 'lib',
        outputDirectory: 'lib-cov'
      }
    }
  });
  
  grunt.registerTask('test', [ 'env:test','cafemocha:test' ]);
  grunt.registerTask('coverage', [ 'env:coverage', 'jscoverage', 'cafemocha:coverage' ]);
};
