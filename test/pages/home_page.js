const { element, $ } = require("protractor");

let HomePage = function() {
    this.homeButton = function() {
        return element(by.buttonText('Home'));
    }
    this.customerButton = function() {
        return element(by.buttonText('Customer Login'));
    }
    this.managerButton = function() {
        return element(by.partialButtonText('Manager Login'));
    }
    this.bankHeader = function() {
        return $('.mainHeading');
    }
};
module.exports = new HomePage();