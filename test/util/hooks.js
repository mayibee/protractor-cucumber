let {After,Before,setDefaultTimeout,Status}=require('@cucumber/cucumber');
const{browser} = require('protractor');

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