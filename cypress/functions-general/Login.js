const Login = () => {
    const user = require('../user.json');
    const env = require('../envconfig.json');

    cy.visit(env.url);
    cy.get('input[name="email"]').type(user.email);
    cy.get('input[name="password"]').type(user.password);
    cy.get('button[type="submit"]').click();

    cy.url().should('eq', `${env.url}/selectClient`);
};

export default Login;
