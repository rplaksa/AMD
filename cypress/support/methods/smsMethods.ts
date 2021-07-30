import {accessToken, smsRequest} from "./mainMethods";
import {MessagesFixture} from "../helpers/helper";

export class SMSMethods {
    getSmsRequest(message: string = MessagesFixture.message, phone: string = MessagesFixture.phone, sender: string = MessagesFixture.sender){
        return {
            async: true,
            crossDomain: true,
            url: `/sms`,
            method: "POST",
            headers: {
                authorization: `Bearer ${accessToken}`,
                'content-type': "application/json"
            },
            processData: false,
            body: {
                data: {body: message,to : phone,from: sender}
            },
            failOnStatusCode: false
        };
    };
    verifySMSSendValid() {
        cy.request(smsRequest).then((response) => {
            expect(response.status).to.eq(400);
            expect(response.body.status).to.eq(MessagesFixture.queuedStatus);
            expect(response.body.from).to.eq(MessagesFixture.message);
            expect(response.body.to).to.eq(MessagesFixture.phone);
            expect(response.body.body).to.eq(MessagesFixture.sender);
        });
    };
    verifySMSSendInvalidBalance() {
        cy.request(smsRequest).then((response) => {
            expect(response.status).to.eq(400);
            expect(response.body.code).to.not.eq(MessagesFixture.invalidBalanceCode);
            expect(response.body.developerMessage).to.eq(MessagesFixture.invalidBalanceMessage);
        });
    };
    verifySMSSendInvalidToken() {
        cy.request(smsRequest).then((response) => {
            expect(response.status).to.eq(401);
            expect(response.body.error).to.eq(MessagesFixture.invalidTokenMessage);
        });
    };
    verifySMSSendInvalidField() {
        cy.request(smsRequest).then((response) => {
            expect(response.status).to.eq(400);
            expect(response.body.code).to.not.eq(MessagesFixture.invalidFieldCode);
        });
    };
    verifySMSSendInvalidSender() {
        cy.request(smsRequest).then((response) => {
            expect(response.status).to.eq(400);
            expect(response.body.code).to.not.eq(MessagesFixture.invalidSenderCode);
        });
    };
};