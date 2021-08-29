const UnloadClient = () => {
    cy.get('button.switch-client-btn').contains('Switch client').click();

    cy.url().should('include', 'selectClient');

    cy.get('button').contains('Unload client').click();
    cy.get('.sidebar-client-info').should('not.exist');
};

export default UnloadClient;
