
it('should be possible to remove a client after one is made', () => {
    cy.visit('http://localhost:4200/clients');

    //inladen
    cy.wait(3000);
    cy.get('[data-test=deletebtn]').click();
    cy.wait(1000);

    //check if exists
    cy.get('[data-test=deletebtn]').should('not.exist', "Clienttest");

});