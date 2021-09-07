import
import { When, Then } from "cypress-cucumber-preprocessor/steps";
import { setAssessRequest, setBase64Token } from "../../support/methods/mainMethods";
import { MessagesFixture } from "../../support/helpers/helper";
import { AccessMethods } from "../../support/methods/accessMethods";

const accessMethods: AccessMethods = new AccessMethods();
When('User gets access with valid Base64Token', () => {
    setBase64Token(MessagesFixture.token);
    setAssessRequest(accessMethods.AccessRequest());
});
When('User gets access without valid Base64Token', () => {
    setBase64Token(MessagesFixture.emptyString);
    setAssessRequest(accessMethods.AccessRequest());
});
Then('User should have authentication response', () => {
    accessMethods.verifyAccessValid();
});
Then('User should have authentication error response', () => {
    accessMethods.verifyAccessInvalidToken();
});
