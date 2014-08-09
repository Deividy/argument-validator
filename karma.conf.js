var browsers = [ 'Firefox', 'PhantomJS' ];

if (!process.env.TRAVIS) {
    browsers.push('Chrome');
}

module.exports = function(config) {
    config.set({
        basePath: '',

        frameworks: ['mocha'],

        files: [
            'argument-validator.js',
            'node_modules/should/should.js',
            'specs/*.spec.js'
        ],

        exclude: [ ],
        reporters: ['progress'],

        port: 9876,
        colors: true,
        logLevel: config.LOG_INFO,
        autoWatch: false,
        
        browsers: browsers,

        captureTimeout: 60000,
        singleRun: true
    });
};
