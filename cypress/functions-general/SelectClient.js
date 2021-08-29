import testClient from '../testClient.json';

const SelectClient = () => {
    cy.get('input[name="email"]').clear().type(testClient.email);
    cy.get('button[type="submit"]').click();

    cy.get('table.mb-table').within((table) => {
        cy.get('tbody').within((tbody) => {
            cy.get('tr').then((row) => {
                row[0].click();
            });
        });
    });

    cy.wait(1000);
};

export default SelectClient;
