const {Given,When,Then} = require('@cucumber/cucumber');
const {element,browser} = require('protractor');
const { protractor } = require('protractor/built/ptor');

const hooks = require('../util/hooks.js');

Then(/^the user clicks on "([^"]*)"$/, function(butn){
    browser.sleep(1000);
    return element(by.buttonText(butn)).click();
});

Then(/^the user clicks on the button that contains "([^"]*)"$/, function(btn){
    browser.sleep(1000);
    return element(by.partialButtonText(btn)).click();
});

When(/^the user clicks on the "([^"]*)" button$/, function(title){
    browser.sleep(1000);
    return element(by.cssContainingText('.redButton', title));
})

Then(/^the user enters "([^"]*)" and "([^"]*)" in the calculator$/, async function(num1,num2){
    await browser.sleep(1000);
    await element(by.model('first')).sendKeys(num1);
    return element(by.model('second')).sendKeys(num2);
});

Then(/^the user sees the result$/, function(){
    return element(by.binding('latest')).getText().then(function(text){
        browser.sleep(2000);
        console.log('Result is:', text);
    });
});

// Then(/^the user clicks on "([^"]*)"$/, function(){
    
// })
// Then(/^the user clicks on "([^"]*)"$/, function(){
    
// })