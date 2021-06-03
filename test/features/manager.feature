Feature: Bank Manager

Scenario: 01 Manager Login
    Given the user navigates to home page
    When the user logs in as a "Bank Manager"
    Then the user sees manager options
@test
Scenario: 02 Manager adds account for customer
    Given the user navigates to home page
    When the user logs in as a "Bank Manager"
    Then the user sees manager options
    Then the manager clicks on "Open Account"
    Then the user selects "Harry Potter" from dropdown
    Then the user adds "Dollar" account for customer