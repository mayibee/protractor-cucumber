const { element, $ } = require("protractor");

let MgrPage = function() {
    this.addCustomerButton= function() {
        return element(by.partialButtonText('Add'));
    }
    this.openAccountButton = function() {
        return element(by.partialButtonText('Account'));
    }
    this.viewCustomersButton = function() {
        return element(by.partialButtonText('Customers'));
    }
    this.currencyDropdown = function() {
        return $('#currency');
    }
    this.currencyOptions = function(accountType) {
        return this.currencyDropdown().element(by.cssContainingText('option', accountType))
    }
    this.processButton = function() {
        return element(by.buttonText('Process'));
    }
};
module.exports = new MgrPage();