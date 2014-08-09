module.exports = function (grunt) {
    grunt.initConfig({
        uglify: {
            prod: {
                files: {
                    'argument-validator.min.js': [ 'argument-validator.js' ]
                }
            }
        },
        karma: {
            unit: {
                configFile: 'karma.conf.js'
            }
        },
        mochaTest: {
            test: {
                options: {
                    reporter: 'spec',
                    require: 'should',
                    colors: true,
                    bail: true
                },
                src: [ 'specs/*.spec.js' ]
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-karma');
    grunt.loadNpmTasks('grunt-mocha-test');

    grunt.registerTask('default', [ 'uglify:prod', 'test' ]);
    grunt.registerTask('test', [ 'karma:unit', 'mochaTest:test']);
};
