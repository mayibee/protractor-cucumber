const {Given,When,Then} = require('@cucumber/cucumber');
const {element,browser} = require('protractor');
const { protractor } = require('protractor/built/ptor');

const hooks = require('../util/hooks.js');

Given(/^the user navigates to "([^"]*)"$/, async function(url) {
    await browser.get(url);
    return browser.sleep(1000);
});

When(/^the user verifies the url$/, function() {
    return browser.getCurrentUrl().then(function(urltext){
        console.log('the current url is '+urltext);
    })
  });

Then(/^the user waits for 5 seconds$/, function() {
    return browser.sleep(2000);
  });

  Then(/^the user reads the title "([^"]*)"$/, function(title) {
    return browser.getTitle().then(function(titleText){
        expect(titleText).to.equal(title);
        console.log(titleText);
    })
  });

  Then(/^the user navigates back to main page$/, function() {
    return browser.navigate().back();
  });

  Then(/^the user navigates forward$/, function() {
      browser.sleep(1000);
    return browser.navigate().forward();
  });

  Then(/^the user refreshes the page$/, function() {
      browser.sleep(1000)
    return browser.refresh();
  });

  Then(/^the user closes the browser$/, function() {
      browser.sleep(1000)
    return browser.close();
  });
