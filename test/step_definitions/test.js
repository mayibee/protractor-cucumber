const {Given,When,Then} = require('@cucumber/cucumber');
const {element,browser} = require('protractor');
const { protractor } = require('protractor/built/ptor');

const hooks = require('../util/hooks.js');

Given(/^the user is able to use protractor$/, function() {
    console.log('I started to test');
});

Then(/^the user can type in the console "([^"]*)"$/, function(text) {
    console.log(text);
});