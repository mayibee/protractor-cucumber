const { browser } = require("protractor");
const EC = protractor.ExpectedConditions;

let Library = function() {
    // navigation
    this.goToHomePage = function() {
        return browser.get('https://www.globalsqa.com/angularJs-protractor/BankingProject/#/login');
    }
    // common
    //returns a promise
    this.waitForPresence = function(el,time) {
        return browser.wait(EC.presenceOf(el),time);
    }
    //returns a promise
    this.waitForElVisible = function(el,time) {
        return browser.wait(EC.visibilityOf(el), time);
    }
    
    // validations
    this.verifyElementIsPresent = function(el) {
        return expect(el.isPresent()).to.eventually.be.true;
    }

};
module.exports = new Library();
