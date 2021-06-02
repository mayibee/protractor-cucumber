const {Given,When,Then} = require('@cucumber/cucumber');
const {element,browser, $, $$} = require('protractor');
const { protractor } = require('protractor/built/ptor');

const hooks = require('../util/hooks.js');
const Lib = require('../reusable_functions/function_library.js');
const Home = require('../pages/home_page.js');
const Mgr = require('../pages/manager_page.js');
const Cust = require('../pages/customer_page.js');
let EC = protractor.ExpectedConditions;

Given(/^the user navigates to home page$/, async function() {
    await Lib.goToHomePage();
    return browser.sleep(2000);
});

When (/^the user logs in as a "([^"]*)"$/, async function (role) {
    await Lib.waitForPresence(Home.bankHeader(),5000);
    if (role==='Customer') {
        await Home.customerButton().click();
    } else {
        await Home.managerButton().click();
    }
    return browser.sleep(1000);
});

Then (/^the user sees manager options$/, async function () {
    await browser.wait(EC.stalenessOf(Home.managerButton()), 5000);
    await Lib.verifyElementIsPresent(Mgr.addCustomerButton());
    await Lib.verifyElementIsPresent(Mgr.openAccountButton());
    return Lib.verifyElementIsPresent(Mgr.viewCustomersButton());
    // return browser.sleep(1000);
});

Then (/^the user selects "([^"]*)" from dropdown$/, async function (customer) {
    await browser.wait(EC.stalenessOf(Home.managerButton()), 5000);
    let allCustomers = await Cust.customerDropdown();
    await allCustomers.forEach(async function(cust){
        await cust.getText().then(async function(text){
            if (text === customer) {
                await cust.click();
            }
        });
    });
});

Then (/^the user clicks the login button$/, async function () {
    await browser.wait(EC.visibilityOf(Cust.customerLoginButton()),5000);
    return Cust.customerLoginButton().click();
});

Then (/^the customer sees the "([^"]*)" welcome banner$/, async function (customer) {
    await browser.wait(EC.visibilityOf(Cust.logoutButton()),5000);
    await Cust.welcomeBanner().getText().then(function(text){
        console.log(text);
    });
    return expect(cust.welcomeBanner().getText()).to.eventually.contain(customer);
});