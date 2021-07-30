import {Given} from "cypress-cucumber-preprocessor/steps";
import {AccessMethods} from "../../support/methods/accessMethods";

const accessMethod: AccessMethods = new AccessMethods();
Given('AccessRequest', () => {
    accessMethod.getAccessToken();
});