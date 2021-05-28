Feature: Practice Browser Actions

## BROWSER ACTIONS

Scenario: 01 Verify the webpage
    Given the user navigates to "http://www.protractortest.org/"
    When the user verifies the url
    Then the user waits for 5 seconds
    Then the user reads the title "Protractor - end-to-end testing for AngularJS"

Scenario: 02 Navigate the application
    Given the user navigates to "http://www.protractortest.org/"
    Then the user navigates to "http://www.protractortest.org/#/api"
    Then the user navigates back to main page
    Then the user navigates forward
    Then the user refreshes the page
    Then the user closes the browser