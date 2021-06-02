
let Library = function() {
    this.goToHomePage = function() {
        return browser.get('https://www.globalsqa.com/angularJs-protractor/BankingProject/#/login');
    }
};
module.exports = new Library();
