const {Given,When,Then} = require('@cucumber/cucumber');
const {element,browser, $, $$} = require('protractor');
const { protractor } = require('protractor/built/ptor');

const hooks = require('../util/hooks.js');
const Lib = require('../reusable_functions/function_library.js');
const Home = require('../pages/home_page.js');
let EC = protractor.ExpectedConditions;

Given(/^the user navigates to home page$/, async function() {
    await Lib.goToHomePage();
    return browser.sleep(2000);
});