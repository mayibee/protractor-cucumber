const {Given,When,Then} = require('@cucumber/cucumber');
const {element,browser, $, $$} = require('protractor');
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

Then(/^the user reads the title as "([^"]*)"$/, function(title) {
    return $('.example').getText().then(function(text){
      expect(text).to.contain(title);
      return browser.sleep(2000);
    });
});

Then(/^the user can hover over the images$/, async function() {
  await browser.actions().mouseMove($('.figure>img')).perform();
  await browser.sleep(4000);

  let lastHover = await $$('.figure').last();
  await browser.actions().mouseMove(lastHover).perform();
  return browser.sleep(4000);
});

Then(/^the user can drag and drop the squares$/, async function() {
  await browser.sleep(2000);
  await browser.actions().dragAndDrop(
    element(by.id('column-a')),
    element(by.id('column-b'))
  ).perform();
  return browser.sleep(2000);
});

Then(/^the user does a mouse click on "([^"]*)"$/, async function(action) {
  await browser.actions().click(element(by.partialButtonText(action))).perform();
  return browser.sleep(2000);
});

Then(/^the user accepts the alert$/, async function() {
  await browser.switchTo().alert().accept;
  return browser.sleep(2000);
});
