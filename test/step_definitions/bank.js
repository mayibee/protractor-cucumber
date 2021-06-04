const {Given,When,Then} = require('@cucumber/cucumber');
const {element,browser, $, $$} = require('protractor');
const { protractor } = require('protractor/built/ptor');

const hooks = require('../util/hooks.js');
const Lib = require('../reusable_functions/function_library.js');
const Home = require('../pages/home_page.js');
const Mgr = require('../pages/manager_page.js');
const Cust = require('../pages/customer_page.js');
const bankData = require('../test_data/customer_data.json');
const { BrowserStack } = require('protractor/built/driverProviders');
let EC = protractor.ExpectedConditions;
let customerId = '';

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
    return expect(Cust.welcomeBanner().getText()).to.eventually.contain(customer);
});

Then(/^the user adds "([^"]*)" account for customer$/, async function(currency){
    await Lib.waitForElVisible(Mgr.currencyDropdown(),5000);
    await Mgr.currencyOptions(currency).click();
    await Lib.waitForElVisible(Mgr.processButton(), 5000);
    return Mgr.processButton().click();
});

Then(/^the manager clicks on "([^"]*)"$/, async function(buttonName){
    if(buttonName === "Open Account")
        await Mgr.openAccountButton().click();
    else if(buttonName === 'Customers')
        await Mgr.viewCustomersButton().click();
    else 
        await Mgr.addCustomerButton().click();
    return browser.sleep(1000);
});

Then(/^the user adds customer$/, async function() {
    let customers = bankData.customers;
    console.log(customers);
    for(let i=0; i<customers.length; i++) {
        await Mgr.addCustomerButton().click();
        await browser.sleep(1000);
        await Mgr.customerFirstName().sendKeys(customers[i].fName);
        await Mgr.customerLastName().sendKeys(customers[i].lName);
        await Mgr.zipCode().sendKeys(customers[i].postCd);
        await Mgr.addButton().click();
        // expect(browser.switchTo().alert().getText()).to.eventually.equal('Customer added successfully with customer id :') -> another option
        await browser.switchTo().alert().getText().then(async function(text) {
            console.log(text);
            customerId = text.split(':')[1];
            console.log(customers[i].fName, customerId);
            expect(text).to.contain('Customer added successfully with customer id :');
            return customerId;
        });
        await browser.switchTo().alert().accept();
    }
});

Then(/^the user makes a deposit of "([^"]*)"$/, async function(deposit){
    await browser.sleep(2000);
    await Cust.makeDepositButton().click().then(async function() {
        await browser.sleep(1000);
        await Cust.depositAmountInput().sendKeys(deposit);
        await Cust.depositAmountButton().click();
        return expect(Cust.depositMessage().getText()).to.eventually.contain('Deposit Successful')
    })
    
});
