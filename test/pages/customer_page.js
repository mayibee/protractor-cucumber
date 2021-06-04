const { element, $ } = require("protractor");
const mgr = require('./manager_page.js')

let CustomerPage = function() {
    this.customerDropdown = function() {
        return element.all(by.repeater('cust in Customers'));
    }
    this.customerLoginButton = function() {
        return element(by.buttonText('Login'));
    }
    this.logoutButton=function(){
        return $('.logout');
    }
    this.welcomeBanner = function() {
        return element(by.css('.borderM strong'));
    }
    this.makeDepositButton = function() {
        return element(by.buttonText('Deposit'));
    }
    this.depositAmountInput = function() {
        return element(by.model('amount'));
    }
    this.depositAmountButton = function() {
        return mgr.customerForm.element(by.buttonText('Deposit'));
    }
    this.depositMessage = function() {
        return $('.error');
    }
};
module.exports = new CustomerPage();