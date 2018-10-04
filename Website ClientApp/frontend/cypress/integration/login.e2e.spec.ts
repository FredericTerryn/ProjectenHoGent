/// <reference types="Cypress" />


it('should show an error when the login is invalid', () => {
    cy.visit('http://localhost:4200/login');

    cy.get('[data-test=username]').type('nottestacc');
    cy.get('[data-test=password]').type('invalid');
    cy.get('[data-test=loginBtn]').click();

    cy.contains('not valid');
});




it('should go to the login page and try to login', () => {
       cy.visit('http://localhost:4200/login');

       cy.get('[data-test=username]').type('testacc');
       cy.get('[data-test=password]').type('testtest');
       cy.get('[data-test=loginBtn]').click();

       //verify if logged in
       cy.visit('http://localhost:4200/clients');       
       cy.url().should('include', 'clients');
       cy.contains('testacc');
   });


