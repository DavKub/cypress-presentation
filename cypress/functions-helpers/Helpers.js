import Login from '../functions-general/Login';
import Logout from '../functions-general/Logout';
import SelectClient from '../functions-general/SelectClient';

export const GenerateRandomString = () => {
    var result = '';
    var characters =
        'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for (var i = 0; i < 10; i++) {
        result += characters.charAt(
            Math.floor(Math.random() * charactersLength)
        );
    }

    return result;
};

export const CheckBloodTestRequest = () => {
    cy.intercept({
        url: `/doctor/bloodtest/`,
        method: 'POST',
    }).as('apiCheck');

    cy.get('button[type="submit"]').click();

    cy.wait('@apiCheck').then((res) => {
        let status = res.response.statusCode;

        expect(status).to.not.eq(204);
        expect(status).to.not.eq(400);
        expect(status).to.not.eq(401);
        expect(status).to.not.eq(402);
        expect(status).to.not.eq(403);
        expect(status).to.not.eq(404);
        expect(status).to.not.eq(500);
    });
};

export const CheckClientServicesRequest = (docName) => {
    cy.intercept({
        url: `/client/${docName}/`,
        method: 'POST',
    }).as('apiCheck');

    cy.get('button[type="submit"]').click();

    cy.wait('@apiCheck').then((res) => {
        let status = res.response.statusCode;
        expect(status).to.eq(201);
    });
};

export const CheckPhysiotherapyRequest = (docName) => {
    cy.intercept({
        url: `/physiotherapy/${docName}/`,
        method: 'PUT',
    }).as('apiCheck');

    cy.get('button[type="submit"]').click();

    cy.wait('@apiCheck').then((res) => {
        let status = res.response.statusCode;
        expect(status).to.eq(200);
    });
};

export const GetClientId = () => {
    let clientId;
    SelectClient();
    cy.window().then((window) => {
        clientId = JSON.parse(localStorage.getItem('clientId'));
        console.log(clientId);
    });

    Logout();
    Login();
};

export const ClearSignaturePad = () => {
    cy.wait(2000);

    cy.get('button').contains('Clear').click();
    cy.get('button[type="submit"]').click();

    cy.get('.error-message').should('contain', 'This is a required field.');
};
