const { element } = require("protractor");

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
};
module.exports = new MgrPage();