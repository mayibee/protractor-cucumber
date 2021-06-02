let browser = require("protractor");
let reporter = require('cucumber-html-reporter');

exports.config = {
    //set to custom for cucumber framework
    framework: 'custom',
    // path that is relative to the current config file
    frameworkPath: require.resolve('protractor-cucumber-framework'),

    //connection to selenium
    seleniumServerJar: './jars/selenium-server-standalone-3.141.59.jar',
    // seleniumAddress: 'http://localhost:4444/wd/hub',
    // directConnect: true,

    // drivers
    chromeDriver: './jars/chromedriver_90.0.4430.24',
    //geckoDriver: '',
    // if you need to test IE -
    // localSeleniumStandaloneOpts:{
    //     jvmArgs:["-Dwebdriver.ie.driver=./jars/IEDriverServer-3.4.0.exe"]
    // },
    ignoreUncaughtExceptions: true,

    // feature files
    specs: [
        './test/features/*.feature'
    ],
    cucumberOpts: {
        //step definitions
        require: [
            './test/step_definitions/*.js'
            //'./test/step_definitions/*.spec.js'
        ],
        tags: [],
        format: ['progress','json:./report/cucumber_report.json']
    },
    plugins: [
        {
            package: 'protractor-multiple-cucumber-html-reporter-plugin',
            options: {
                jsonDir: './report/',
                jsonOutputPath: './report/json-output-folder',
                reportPath: './report/',
                screenshotsDirectory: './report/screenshots/',
                storeScreenshots: false,
                reportSuiteAsScenarios: true,
                openReportInBrowser: true,
                removeOriginalJsonReportFile: true,
                removeExistingJsonReportFile: true,
                automaticallyGenerateReport: true,
                launchReport: true,
                reportName: 'Protractor Cucumber Report',
                pageTitle: 'Regression Testing Report',
                customData: {
                    title: 'Report Info',
                    data: [
                        {label: 'Project', value: 'Our Cucumber Framework'},
                        {label: 'Sprint', value: '1.5'},
                        {label: 'Date', value: Date()},
                        {label: 'Environment', value: 'Integration Testing'}
                    ]
                }
            },
            multiCapabilities: [{
                browserName: 'chrome',
                chromeOptions: {
                    args: ['disable-infobars']
                },
                metadata: {
                    browser: {
                        name: 'chrome',
                        version: '90'
                    },
                    device: 'MacBook Pro 15',
                    platform: {
                        name: 'osx',
                        version: '10.14.6'
                    }
                }
            }]
        }
    ],
    // Parallel testing
    // count:1 -> number of times to run the capabilities
    // shardTestFiles: false -> true specs will be sharded by feature file
    // maxInstances: 1 -> number of browser instances running in parallel 

    beforeLaunch: () => {
        /*A callback function called once configs are read but before any environment setup. This will only run once before onPrepare to bring up test dependencies.*/
    },
    onPrepare: function() {
        /*A callback function called once protractor is ready and available, and before the tests are executed. If multiple capabilities are being run, this will run once per capability.*/
        let globals = require('protractor');
        browser = globals.browser;
        browser.ignoreSynchronization = true;
        browser.waitForAngularEnabled();
        browser.waitForAngular(5000);

        //browser window setting
        browser.manage().window().maximize();
        // browser.manage().window().setSize(1600,1000);

        // implicit wait
        browser.manage().timeouts().implicitlyWait(50000);

        //assertion library
        global.chai = require('chai');
        global.expect = chai.expect;
        var chaiAsPromised = require('chai-as-promised');
        chai.use(chaiAsPromised);
    },
    onComplete: function(){
        /*A callback function called once tests are finished. onComplete can optionally return a promise, which Protractor will wait for before shutting down webdriver. At this point, tests will be done but global objects will still be available.*/
        let options = {
            theme: 'bootstrap',
            jsonFile: './report/cucumber_report.json',
            output: './report/cucumber_report.html',
            reportSuiteAsScenarios: true,
            scenarioTimestamp: true,
            launchReport: true,
            metadata:{
                "test environment": "UAT",
                "browser": "Chrome"
            }
        };
        reporter.generate(options);
    },
    onCleanUp: function() {
        /*A callback function called once the tests have finished running and the WebDriver instance has been shut down. This is called once per capability. */
    }, 
    afterLaunch: function() {
        /* A callback function called once all tests have finished running and the WebDriver instance has been shut down. It is passed the exit code(0 if the tests passed). This is called only once before the program exits (after onCleanUp). */
        console.log('cleaning up')
    }

}