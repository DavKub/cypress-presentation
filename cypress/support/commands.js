// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

// EXAMPLE
Cypress.Commands.add('login', (releaseNumber) => {
    const url = `https://dev-r${releaseNumber}.modobio.com`;

    cy.visit(`${url}/login`);
    cy.get('input[name="email"]').type(Cypress.env('email'));
    cy.get('input[name="password"]').type(Cypress.env('password'));

    cy.intercept({
        url: '**/staff/token/**',
        method: 'POST',
    }).as('token');

    cy.intercept({
        url: '**/lookup/roles/**',
        method: 'GET',
    }).as('roles');

    cy.get('button[type="submit"]').click();
    cy.wait('@token').its('response.statusCode').should('eq', 201);
    cy.wait('@roles').its('response.statusCode').should('eq', 200);
    cy.url().should('include', url);
});

Cypress.Commands.add('logout', () => {
    cy.get('button[name="profileButton"]').click();
    cy.get('button[name="logout"]').click();
    cy.url().should('include', 'login');
});
