// conf.js
exports.config = {
    allScriptsTimeout: 99999,
    framework: 'jasmine',
    seleniumAddress: 'http://localhost:4444/wd/hub',
    specs: ['../tests/test.js'],
    capabilities: {
        browserName: 'chrome'
    },
    jasmineNodeOpts: {
        realtimeFailure: true
    }
};