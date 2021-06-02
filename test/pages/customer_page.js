const { element } = require("protractor");

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
};
module.exports = new CustomerPage();