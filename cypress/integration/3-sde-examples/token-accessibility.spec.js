describe('Test /token and /roles accessibility against different environments', () => {
    /** 
     * DEPRECATED
    
    it('Test Release 2', () => {
        cy.login(2);
        cy.logout();
    });
    it('Test Release 3', () => {
        cy.login(3);
        cy.logout();
    });

    it('Test Release 4', () => {
        cy.login(4);
        cy.logout();
    });

    **/

    it('Test Release 0.7', () => {
        cy.login('0-7');
        cy.logout();
    });
});
