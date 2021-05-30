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

Scenario: 04 Mouse Hover Over 
    Given the user navigates to "http://the-internet.herokuapp.com/hovers"
    When the user reads the title as "Hovers"
    Then the user can hover over the images

Scenario: 05 Mouse Drag and Drop
    Given the user navigates to "http://the-internet.herokuapp.com/drag_and_drop"
    When the user reads the title as "Drag and Drop"
    Then the user can drag and drop the squares


Scenario: 06 Mouse Click
    Given the user navigates to "http://the-internet.herokuapp.com/javascript_alerts"
    When the user reads the title as "JavaScript Alerts"
    Then the user does a mouse click on "Confirm"
    Then the user accepts the alert

Scenario: 07 Scroll to Element
    Given the user navigates to "https://www.rememberthemilk.com"
    Then the user scrolls to the footer icon 

Scenario: 08 Scroll Up and Down
    Given the user navigates to "https://www.rememberthemilk.com"
    Then the user scrolls down to the bottom of the Page
    Then the user scrolls up to the top of the page

    @test
Scenario: 09 JavaScript Click
    Given the user navigates to "https://www.rememberthemilk.com"
    Then the user uses JavaScript Click