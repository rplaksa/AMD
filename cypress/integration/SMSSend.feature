Feature: SMS Send

  User sends SMS

  Scenario: Valid SMS
    Given AccessRequest
    When User sends SMS
    Then User should have valid SMS response

  Scenario: Invalid token
    Given AccessRequest
    When User sends SMS with Invalid token
    Then User should have Invalid token error

  Scenario: Insufficient Balance
    Given AccessRequest
    When User sends SMS
    Then User should have Insufficient Balance error

  Scenario: Invalid message
    Given AccessRequest
    When User sends SMS without message
    Then User should have Invalid value of a field

  Scenario: Invalid phone
    Given AccessRequest
    When User sends SMS without phone
    Then User should have Invalid value of a field

  Scenario: Invalid sender
    Given AccessRequest
    When User sends SMS with Invalid sender
    Then User should have Invalid sender of a field