protractor = require('./conf.js');
let config = protractor.config;

config.capabilities = {
    'browserName':'chrome',
    'directConnect':true,
    chromeOptions: {
        'useAutomationExtension': false,
        'args': [
            'show-fps-counter=true',
            'allow-file-access-from-files'
        ],
        'binary': ''
    },
    metadata: {
        browser: {
            name: 'chrome',
            version: '58'
        },
        device: 'MacBook Pro',
        platform: {
            name: 'osx',
            version: '10.14.6'
        }
    }
}

exports.config = config;