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
    this.customerFirstName = function() {
        return element(by.model('fName'));
    }
    this.customerLastName = function() {
        return element(by.model('lName'));
    }
    this.zipCode = function() {
        return element(by.model('postCd'));
    }
    this.customerForm = function() {
        return element(by.name('myForm'));
    }
    this.addButton = function() {
        return this.customerForm().element(by.buttonText('Add Customer'))
    }
};
module.exports = new MgrPage();