import Login from '../../functions-general/Login';
import Logout from '../../functions-general/Logout';
import GenerateRandomString from '../../functions-helpers/GenerateRandomString';

// For this presentation only
// For DEPRECATED environment

describe('Client Account creation process', () => {
    let auth;
    let email = GenerateRandomString();

    beforeEach('Login', () => {
        Login();

        cy.window().then((window) => {
            auth = window.localStorage.getItem('auth');
        });
    });

    it('Create a new client, check for same email usage error, delete created client', () => {
        let parsed = JSON.parse(auth);
        let token = parsed.token;
        cy.log(token);

        cy.get('button').contains('Create Client').click();
        cy.url().should('include', 'clientOnboarding');

        // Create client
        cy.get('input[name="firstName"]').type('Test');
        cy.get('input[name="lastName"]').type('Name');
        cy.get('input[name="email"]').type(`${email}@test.com`);

        cy.get('button[type="submit"]').click();
        cy.wait(1000);

        cy.get('.status-success').should('exist');

        // Check snackbar
        cy.get('div')
            .contains('Success! Your new client was automatically selected.')
            .should('exist');

        cy.get('input[name="password-resultInput"]').should('exist');
        cy.get('input[name="id-resultInput"]').should('exist');

        cy.get('button[name="password-copyButton"]').should('exist');
        cy.get('button[name="id-copyButton"]').should('exist');

        // Delete client
        cy.request({
            url: 'https://dev-api.modobio.com/client/clientsearch/?per_page=999',
            method: 'GET',
            followRedirect: false,
            failOnStatusCode: false,
            headers: { Authorization: `Bearer ${token}` },
        }).then((response) => {
            let clients = response.body.items;

            let clientId = clients
                .filter((client) => client.email === `${email}@test.com`)
                .map((item) => item.clientid);

            let newClientId = clientId[0];

            cy.log(newClientId);

            // Fill in and submit already used email
            cy.get('input[name="firstName"]').type('Test');
            cy.get('input[name="lastName"]').type('Name');
            cy.get('input[name="email"]').type(`${email}@test.com`);

            cy.get('button[type="submit"]').click();

            cy.get('p.status-fail').should(
                'contain',
                'Error Generating Link. Contact your system administrator'
            );

            // Check snackbar
            cy.get('div')
                .contains(
                    `The email, ${email}@test.com is already in use for a client account.`
                )
                .should('exist');

            cy.request({
                url: `https://dev-api.modobio.com/client/remove/${newClientId}/`,
                method: 'DELETE',
                followRedirect: false,
                headers: { Authorization: `Bearer ${token}` },
            }).then((res) => {
                if (res.status !== 200) {
                    cy.log('A problem occured. Client has not been deleted');
                    return;
                }

                expect(res.status).to.eq(200);
                cy.log(
                    `User ${newClientId} with email ${email}@test.com has been removed fom the database`
                );

                cy.request({
                    url: `https://dev-api.modobio.com/​client/${newClientId}/`,
                    followRedirect: false,
                    failOnStatusCode: false,
                    headers: { Authorization: `Bearer ${token}` },
                }).then((res) => {
                    expect(res.status).to.eq(404);
                });
            });
        });

        Logout();
    });
});
