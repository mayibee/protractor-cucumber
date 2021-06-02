const {Given,When,Then} = require('@cucumber/cucumber');
const {element,browser, $, $$} = require('protractor');
const { protractor } = require('protractor/built/ptor');

const hooks = require('../util/hooks.js');
let EC = protractor.ExpectedConditions;
let browserHandles = [];

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
    // return browser.close();
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
  await browser.switchTo().alert().accept();
  await expect($('#result').getText()).to.eventually.contain('Ok');
  return browser.sleep(2000);
});

Then(/^the user scrolls to the footer icon$/, async function() {
  await browser.executeScript('arguments[0].scrollIntoView();', $('.rtm-footer-milky')).then(function(){
    browser.sleep(2000);
    return element(by.linkText('About')).click();
  })
});

Then(/^the user scrolls down to the bottom of the Page$/, async function() {
  await browser.executeScript('window.scrollTo(0,document.body.scrollHeight)').then(function(){
    return browser.sleep(2000);
  })
});

Then(/^the user scrolls up to the top of the page$/, async function() {
  await browser.executeScript('window.scrollTo(0,0)').then(function(){
    return browser.sleep(2000);
  })
});

Then(/^the user uses JavaScript Click$/, async function() {
  await browser.executeScript('arguments[0].click();', element(by.linkText('Upgrade')));
  return browser.sleep(2000);
});

Then(/^the user clicks on the "([^"]*)" dropdown$/, async function(menu) {
  if(menu==="Features & Benefits")
  await $$('.dropdown-toggle').first().click();
  else if(menu==='Help')
  await $$('.dropdown-toggle').get(1).click();
  return browser.sleep(2000);
});

Then(/^the user selects the option "([^"]*)"$/, async function(opt) {
  if(opt==="For Writing") {
    await browser.wait(EC.visibilityOf($$('.dropdown-menu').first()), 5000).then(function(){
      return $('.dropdown-menu').element(by.cssContainingText('li',opt)).click();
    });
  } else if(opt==='Contact Us') {
    await browser.wait(EC.visibilityOf($$('.dropdown-menu').get(1)), 5000).then(function(){
      return $$('.dropdown-menu').get(1).element(by.cssContainingText('li',opt)).click();
    })
  }
  return browser.sleep(2000);
});

Then(/^the user will see the contact us modal$/, async function() {
  await browser.wait(EC.presenceOf($('.contact-us-modal'))).then(function(){
    return expect(element(by.name('contactForm')).isDisplayed()).to.eventually.equal(true);
  });
});

Then(/^the user will not see the "([^"]*)" option$/, async function(option) {
  await browser.wait(EC.invisibilityOf($('.dropdown-menu').element(by.cssContainingText('li',option))),5000).then(function(){
    return expect($('.dropdown-menu').element(by.cssContainingText('li',option)).isDisplayed()).to.eventually.equal(false);
  });
});

Then(/^the user clicks on "([^"]*)" in the navigation bar$/, async function(projects) {
  await element(by.name(projects)).click();
  return browser.sleep(2000);
});

When (/^the user selects "([^"]*)" from the OS dropdown$/, async function (opt) {
  await browser.wait(EC.stalenessOf(element(by.cssContainingText('a','Become a uTester'))),5000)
  await $('.clearfix').element(by.model('filterProject.osType')).element(by.tagName('span')).click();
  return $('.clearfix').element(by.model('filterProject.osType')).element(by.tagName('input')).sendKeys(opt).sendKeys(protractor.Key.ENTER);
});

Then (/^the user sees the available projects$/, function () {
  return browser.wait(EC.invisibilityOf(element(by.cssContainingText('li', 'Suggested'))),10000).then(function(){
      return element.all(by.repeater('project in groups.all.feedItems')).count().then(function(count){
          return expect(count).to.be.at.least(5);
      });
  })
});

Then(/^the user clicks on "([^"]*)" link$/, async function(linkTitle) {
  return element(by.linkText(linkTitle)).click();
});

Then(/^the user reads the new window$/, async function() {
  return browser.getAllWindowHandles().then(async function(handles){
    browserHandles = handles;
    console.log(browserHandles);
    await browser.switchTo().window(browserHandles[1]).then(async function(){
      await browser.sleep(2000);
      await browser.getCurrentUrl().then((url)=>expect(url).to.contain('windows/new'));
      return $('.example').getText().then((text)=>expect(text).to.equal('New Window'));
    })
    return browserHandles;
  })
});

Then(/^the user goes back to the old window$/, async function() {
  return browser.close().then(async function(){
    await browser.switchTo().window(browserHandles[0]);
    await browser.sleep(2000);
    return expect(element(by.linkText('Click Here')).isDisplayed()).to.eventually.equal(true);
  })
});

Then (/^the user switches to the iframe$/, function(){
  return browser.switchTo().frame(browser.driver.findElement(by.tagName('iframe'))).then(function(){
      $('#tinymce').click();
      $('#tinymce').clear();
      $('#tinymce').sendKeys('This is my text in frame');
      return browser.sleep(2000);
  });
});

Then (/^the user exits the iframe$/, function(){
  return browser.switchTo().defaultContent();
});

Then (/^the user verifies the text in the middle frame$/, function(){
  let frameTop = element(by.name('frame-top')).getWebElement();
  browser.switchTo().frame(frameTop);
  let frameMid = element(by.name('frame-middle')).getWebElement();
  browser.switchTo().frame(frameMid);
  element(by.id('content')).getText().then((text)=>{console.log(text)});
  return browser.switchTo().defaultContent();
});