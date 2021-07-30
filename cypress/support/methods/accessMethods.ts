import {assessRequest, base64Token, setTokenAccess, setBase64Token} from "./mainMethods";
import {MessagesFixture} from "../helpers/helper";

export class AccessMethods {
    AccessRequest() {
        return {
            async: true,
            crossDomain: true,
            url: "https://auth.routee.net/oauth/token",
            method: "POST",
            headers: {
                authorization: `Basic ${base64Token}`,
                "content-type": "application/x-www-form-urlencoded"
            },
            body: {
                grant_type: "client_credentials"
            },
            failOnStatusCode: false
        };
    };
    getAccessToken()  {
        setBase64Token(MessagesFixture.token);
        const tokenRequest = this.AccessRequest();
        cy.request(tokenRequest).then((response) => {
            setTokenAccess(response.body.access_token);
        });
    };
    verifyAccessValid() {
        cy.request(assessRequest).then((response) => {
            expect(response.status).to.eq(200)
            expect(response.body).to.have.property(MessagesFixture.tokenAccessMessage)
            expect(response.body.token_type).to.eq(MessagesFixture.tokenType)
        });
    };
    verifyAccessInvalidToken() {
        cy.request(assessRequest).then((response) => {
            expect(response.status).to.eq(401)
            expect(response.body.error).to.eq(MessagesFixture.invalidBase64TokenError)
            expect(response.body.message).to.eq(MessagesFixture.invalidBase64TokenMessage)
        });
    };
};