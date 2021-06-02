Feature: Protractor Locators

Scenario: 01 By Button Text
    Given the user navigates to "https://www.facebook.com/"
    Then the user clicks on the button "Log In"

Scenario: 02 By Partial Button Text
    Given the user navigates to "https://www.netflix.com"
    Then the user clicks on the button that contains "Started"

Scenario: 03 By CSS Containing Text
    Given the user navigates to "https://www.netflix.com"
    When the user clicks on the "Sign In" button
    Then the user verifies the url

Scenario: 04 By Model
    Given the user navigates to "http://juliemr.github.io/protractor-demo/"   
    When the user enters "8" and "4" in the calculator
    Then the user clicks on "Go!"

Scenario: 05 By Binding and By Exact Binding
    Given the user navigates to "http://juliemr.github.io/protractor-demo/"  
    When the user enters "9" and "3" in the calculator
    Then the user clicks on "Go!"
    Then the user sees the result

Scenario: 06 By Options For Dropdowns and Element All Functions
    Given the user navigates to "http://juliemr.github.io/protractor-demo/"  
    When the user enters "7" and "5" in the calculator
    Then the user selects "SUBTRACTION"
    Then the user clicks on "Go!"
    Then the user sees the result

Scenario: 07 By Repeater and By Exact Repeater
    Given the user navigates to "http://juliemr.github.io/protractor-demo/"  
    When the user enters "7" and "5" in the calculator
    Then the user selects "ADDITION"
    Then the user clicks on "Go!"
    When the user enters "9" and "3" in the calculator
    Then the user selects "DIVISION"
    Then the user clicks on "Go!"
    When the user enters "10" and "4" in the calculator
    Then the user selects "MODULO"
    Then the user clicks on "Go!"
    When the user enters "6" and "2" in the calculator
    Then the user selects "MULTIPLICATION"
    Then the user clicks on "Go!"
    When the user enters "18" and "15" in the calculator
    Then the user selects "SUBTRACTION"
    Then the user clicks on "Go!"
    Then the user sees the latest result on the table

Scenario: 08 By Custom Locator
    Given the user navigates to "http://juliemr.github.io/protractor-demo/"  
    When the user enters "7" and "5" in the calculator
    Then the user selects "MODULO"
    Then the user clicks on "Go!" through custom locator
    Then the user sees the result

Scenario: 09 Protractor Keys
    Given the user navigates to "https://www.google.com"
    When I type "what is the time in DC"
    Then I see the results page

Scenario: 10 isDisplayed, isPresent functions
    Given the user navigates to "https://www.amazon.com"
    Then the user verifies the logo is displayed
    Then the user verifies "Best Sellers" link is present

Scenario: 11 isEnabled, isSelected functions
    Given the user navigates to "https://www.overleaf.com"
    Then the user verifies checkbox for emails is enabled
    Then the user verifies checkbox is not selected
    Then the user clicks on the checkbox
    Then the user verifies if the checkbox is selected