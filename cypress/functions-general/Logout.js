const Logout = () => {
    cy.get('.hidden-button').last().click();
    cy.get('button').contains('Log Out').click();
    cy.url().should('contain', 'login');
};

export default Logout;
