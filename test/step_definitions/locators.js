const {Given,When,Then} = require('@cucumber/cucumber');
const {element,browser, by, $} = require('protractor');
const { protractor } = require('protractor/built/ptor');

const hooks = require('../util/hooks.js');
const EC = protractor.ExpectedConditions;

Then(/^the user clicks on "([^"]*)"$/, function(butn){
    browser.sleep(1000);
    return element(by.buttonText(butn)).click();
});

Then(/^the user clicks on the button that contains "([^"]*)"$/, function(btn){
    browser.sleep(1000);
    return element(by.partialButtonText(btn)).click();
});

When(/^the user clicks on the "([^"]*)" button$/, function(title){
    browser.sleep(1000);
    return element(by.cssContainingText('.redButton', title));
})

Then(/^the user enters "([^"]*)" and "([^"]*)" in the calculator$/, async function(num1,num2){
    await browser.sleep(1000);
    await element(by.model('first')).sendKeys(num1);
    return element(by.model('second')).sendKeys(num2);
});

Then(/^the user sees the result$/, function(){
    browser.sleep(5000)
    return element(by.binding('latest')).getText().then(function(text){
        browser.sleep(1000);
        console.log('Result is: '+text);
    });
});

Then (/^the user selects "([^"]*)"$/, function(operator) {
    browser.sleep(2000);
    let allOptions = element.all(by.options('value for (key, value) in operators'));
    allOptions.each(function (option, index) {
        option.getAttribute('value').then(function (text) {
            console.log(index, text);
        });
    });
    if (operator === 'ADDITION') {
        return allOptions.first().click();
    } else if (operator === 'DIVISION') {
        return allOptions.get(1).click();
    } else if (operator === 'MODULO') {
        return allOptions.get(2).click();
    } else if (operator === 'MULTIPLICATION') {
        return allOptions.get(3).click();
    } else if (operator === 'SUBTRACTION') {
        return allOptions.last().click();
    } 
}); 

Then(/^the user sees the latest result on the table$/, async function(){
    await browser.sleep(5000)
    await element.all(by.repeater('result')).count().then(function(numRows) {
        console.log('rows on table', numRows);
    });
    await element.all(by.exactRepeater('result in memory')).each(function(item, index){
        item.getText().then(function(rowData){
            console.log("row",index,"->", rowData);
        });
    });
    return element.all(by.repeater('result')).each(function(item, index){
        item.element(by.css('td:nth-child(3)')).getText().then(function(columnData){
            console.log('column',index,'->',columnData)
            if (index === 0) {
                console.log('latest calculation Result:', columnData);
            }
        })
    })
})

Then(/^the user clicks on "([^"]*)" through custom locator$/, async function(el){
    // Add the custom locator.
    by.addLocator('buttonSimple', function(buttonText, opt_parentElement) {
        // This function will be serialized as a string and will execute in the browser. The first argument is the text for the button. The second argument is the parent element, if any.
            let using = opt_parentElement || document;
            buttons = using.querySelectorAll('button');
            // Return an array of buttons with the text.
            return Array.prototype.filter.call(buttons, function(button) {
                return button.textContent === buttonText;
            });
        });
    
        // Use the custom locator.
       return element(by.buttonSimple(el)).click();
});

When(/^I type "([^"]*)"$/, async function(text){
    await element(by.name('q')).sendKeys(text).sendKeys(protractor.Key.TAB);
    await element(by.name('q')).getAttribute('value').then((search)=>{
        expect(text).to.equal(search);
    });
    return element(by.name('q')).sendKeys(protractor.Key.ENTER);
})

When(/^I see the results page$/, async function(){
    await browser.sleep(5000);
    await browser.getCurrentUrl().then((url)=>{
        console.log(url);
        expect(url).to.contain("DC");
    })
})


When(/^the user verifies the logo is displayed$/, async function(){
    await browser.sleep(3000);
    await $('#nav-logo-sprites').isDisplayed().then(function(result){
        if(result) {
            return $('#nav-logo-sprites').click();
        } else {
            console.log('not displayed')
        }
    })
})

Then (/^the user verifies "([^"]*)" link is present$/, function(link){
    return element(by.cssContainingText('.hmenu-item',link)).isPresent().then(function(result){
        if (result) {
            console.log('link is present');
        } else {
            console.log('FAIL: link is not present')
        }
    });
});

Then (/^the user verifies checkbox for emails is enabled$/, function(){
    return element(by.id('newslettercheckbox')).isEnabled().then(function(result){
        if(result){
            element(by.id('newslettercheckbox')).element(by.xpath('..')).getText().then(function(value){
                expect(value).to.contain("I’d like emails about product offers and company news and events.");
            });
        } 
    });
});

Then (/^the user verifies checkbox is not selected$/, function(){
    browser.sleep(2000)
    return element(by.id('newslettercheckbox')).isSelected().then(function(result){
        if(!result){
            return element(by.id('newslettercheckbox')).getAttribute('class').then(function(attr){
                expect(attr).to.contain("ng-empty");
                console.log('not selected')
            })
        } else {
            return element(by.id('newslettercheckbox')).getAttribute('class').then(function(attr){
                expect(attr).to.contain("ng-not-empty");
                console.log('selected')
            });
        }
    });
});

Then (/^the user clicks on the checkbox$/, function(){
    return element(by.id('newslettercheckbox')).click();
});

Then (/^the user verifies if the checkbox is selected$/, function(){
    browser.sleep(2000)
    return element(by.id('newslettercheckbox')).isSelected().then(function(result){
        if(result){
            return element(by.id('newslettercheckbox')).getAttribute('class').then(function(attr){
                expect(attr).to.contain("ng-not-empty");
                console.log('selected')
            })
        } else {
            return element(by.id('newslettercheckbox')).getAttribute('class').then(function(attr){
                expect(attr).to.contain("ng-empty");
                console.log('not selected')
            })
        }
    });
});