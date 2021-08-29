describe('Search and interaction', () => {
    it('Search for random stuff', () => {
        // Visits root url from config file
        // cypress.json
        cy.visit('/');

        // Finds a link with specific text
        // Clicks on it
        // Checks URL for partial match
        cy.get('a').contains('Team').click();
        cy.url().should('include', 'team');

        // Scrolls to the bottom of the page
        // Finds a parent element (footer)
        // Searches only within its scope
        cy.scrollTo('bottom');
        cy.get('.footer').within((element) => {
            cy.get('h2.h5').should('have.length', 4);
        });
    });

    it('Finds specific profile and checks for info', () => {
        // Finds an input field by name attr
        // Types a text and presses enter
        cy.get('input[name="q"]').type('DavKub{enter}');
        cy.get('a').contains('davkub.github').click();
        cy.get('a').contains('DavKub').click();

        // Using Cypress target tool
        cy.get(
            '.mt-4.position-sticky > .container-xl > .gutter-condensed > .col-md-9 > .UnderlineNav > .UnderlineNav-body > .selected'
        );
    });
});
