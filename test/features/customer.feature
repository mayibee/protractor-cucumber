Feature: Customer

Scenario: 01 Customer Login
    Given the user navigates to home page
    When the user logs in as a "Customer"
    Then the user selects "Harry Potter" from dropdown
    Then the user clicks the login button
    Then the customer sees the "Harry Potter" welcome banner