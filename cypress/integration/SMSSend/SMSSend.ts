import {MessagesFixture} from "../../support/helpers/helper";
import {SMSMethods} from "../../support/methods/smsMethods";
import {setTokenAccess, setSmsRequest} from "../../support/methods/mainMethods";
import {Then, When} from "cypress-cucumber-preprocessor/steps";
const smsMethods: SMSMethods = new SMSMethods();
When('User sends SMS', () => {
    setSmsRequest(smsMethods.getSmsRequest());
});
When('User sends SMS with Invalid token', () => {
    setTokenAccess(MessagesFixture.emptyString);
    setSmsRequest(smsMethods.getSmsRequest());
});
When('User sends SMS without message', () => {
    setSmsRequest(smsMethods.getSmsRequest(MessagesFixture.emptyString));
});
When('User sends SMS without phone', () => {
    setSmsRequest(smsMethods.getSmsRequest(MessagesFixture.message,MessagesFixture.emptyString));
});
When('User sends SMS with Invalid phone', () => {
    setSmsRequest(smsMethods.getSmsRequest(MessagesFixture.message,MessagesFixture.phone));
});
When('User sends SMS without sender', () => {
    setSmsRequest(smsMethods.getSmsRequest(MessagesFixture.message,MessagesFixture.phone,MessagesFixture.emptyString));
});
When('User sends SMS with Invalid sender', () => {
    setSmsRequest(smsMethods.getSmsRequest(MessagesFixture.message,MessagesFixture.phone,MessagesFixture.invalidPhone));
});
Then('User should have valid SMS response', () => {
    smsMethods.verifySMSSendValid();
});
Then('User should have Insufficient Balance error', () => {
    smsMethods.verifySMSSendInvalidBalance();
});
Then('User should have Invalid token error', () => {
    smsMethods.verifySMSSendInvalidToken();
});
Then('User should have Invalid value of a field', () => {
    smsMethods.verifySMSSendInvalidField();
});
Then('User should have Invalid sender of a field', () => {
    smsMethods.verifySMSSendInvalidSender();
});