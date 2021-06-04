let {After,Before,setDefaultTimeout,Status}=require('@cucumber/cucumber');
// let yaml = require('js-yaml');
// let fs = require('fs');
const{browser} = require('protractor');

// let env = yaml.load(fs.readFileSync('../ProtractorCucumber/test/util/baseproperties.yaml', 'utf-8'));

Before(function(scenario){
    //adding later
});

After(async function (scenarioResult){
    const self = this;
    const scenario = scenarioResult.pickle.name;
    console.log('Scenario Completed:', scenario);
    if(scenarioResult.result.status === Status.FAILED) {
        console.log('Scenario Failed:', scenario);
        await browser.driver.takeScreenshot().then(function(screenshot){
            return self.attach(screenshot, 'image/png');
        });
    }
});

setDefaultTimeout(5*60*1000);