Feature: Authentication

  User is authenticating

  Scenario: Valid token
    Given AccessRequest
    When User gets access with valid Base64Token
    Then User should have authentication response

  Scenario: Invalid token
    Given AccessRequest
    When User gets access without valid Base64Token
    Then User should have authentication error response