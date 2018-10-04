beforeEach(function () {
//login
cy.visit('http://localhost:4200/login');

cy.get('[data-test=username]').type('testacc');
cy.get('[data-test=password]').type('testtest');
cy.get('[data-test=loginBtn]').click();  
cy.visit('http://localhost:4200/home');

//login via backend, werkt niet(?)
// cy.request({
//   method: 'POST',
//   url: 'http://localhost:4200/API/users/login',
//   body: {"username": "testacc", "password": "testtest"},
// // }).then(res => localStorage.setItem('currentUser', res.body.token));
// });

})


    it('should be possible to make a client when everthing is filled in properly', () => {
      cy.visit('http://localhost:4200/addclient');
  
      cy.get('[data-test=name]').type('Clienttest');
      cy.get('[data-test=email]').type('clienttest.test@gmail.com');
      cy.get('[data-test=streetname]').type('StreetTest');
      cy.get('[data-test=streetnumber]').type('10');
      cy.get('[data-test=phone]').type('+32411111111');
      cy.get('[data-test=gender]').select('Male');
      cy.get('[data-test=birth]').type('1997-01-01');
      cy.get('[data-test=submitbtn]').click();
  
      //check if exists
      cy.url().should('include', 'clients');
//      cy.contains('[data-test=clientlist]').should('include', "Clienttest");
      cy.contains('Clienttest');
  
    });
  
    it('should not be possible to add false client', () => {
      cy.visit('http://localhost:4200/addclient');
  
      cy.get('[data-test=name]').type('a');
      cy.get('[data-test=email]').type('notvalid');
      cy.get('[data-test=streetname]').type('a');
      cy.get('[data-test=streetnumber]').type('notvalid');
      cy.get('[data-test=phone]').type('notvalid');
      cy.get('[data-test=birth]').type('2300-01-01');
      cy.get('[data-test=submitbtn]').should('be.disabled')


  
      //check if exists
      cy.contains('not valid');

    });
