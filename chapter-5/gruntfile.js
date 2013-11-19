module.exports = function(grunt) {

  grunt.loadNpmTasks('grunt-jscoverage'); 
  grunt.loadNpmTasks('grunt-cafe-mocha');
  grunt.loadNpmTasks('grunt-contrib-handlebars');
  grunt.loadNpmTasks('grunt-cucumber');
  grunt.loadNpmTasks('grunt-env');

  grunt.initConfig({
    env: {
      test: { NODE_ENV: 'TEST' },
      coverage: { NODE_ENV: 'COVERAGE' }
    },
    cucumberjs: {
      files: 'features',
      options: {
        steps: "features/step_definitions",
        format: "pretty"
      }
    },
    handlebars: {
      compile: {
        options: {
          namespace: "visiontemplates"
        },
        files: {
          "public/components/vision/templates.js": ["templates/*.hbs"]
        }
      }
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
