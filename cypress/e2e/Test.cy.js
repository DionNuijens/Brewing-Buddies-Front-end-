
describe('CRUD', () => {
  const userName = 'CypressUser'; 
  const email = "cypress@gmail.com";
  const password = "Cypress1!";
  const editUserName = 'CypressUserEdit';


  beforeEach(() => {
    cy.visit('http://localhost:5173')
    cy.contains('Log In').click();
    cy.Auth0Login(email, password);
     
  });

  it('should create a user', () => {
    cy.intercept('POST', '/AddUser*').as('createUser');   
    cy.contains('Create User').click();  
    cy.get('#UserName').type(userName); 
    cy.get('#CreateUser').click();
    

    cy.contains('.user-name', userName).should('exist');
    cy.wait('@createUser').its('response.statusCode').should('eq', 201);

  });

  it('Should display the list of Users', () => {
    cy.intercept('GET', '/account*').as('getUser');
    cy.contains('Manage Users').click();
    cy.wait('@getUser').its('response.statusCode').should('eq', 200);
    cy.get('.user-container').should('be.visible'); 
    cy.contains('.user-name', userName).should('exist');

  });

  it('should edit a user', () => {
    cy.intercept('PUT', '/updateUser*').as('updateUser');
    cy.contains('Manage Users').click();
    cy.get('#editUser').click();
    cy.get('#userName').clear().type(editUserName);
    cy.get('#updateUser').click(); 

    cy.contains('.user-container', editUserName).should('exist');
    cy.wait('@updateUser').its('response.statusCode').should('eq', 204);
  });

  it('should delete a user', () => {
    cy.intercept('DELETE', '/Delete*').as('deleteUser'); 
    cy.contains('Manage Users').click(); 
    cy.get('#deleteUser').click();

    cy.contains('.user-container', editUserName).should('not.exist');
    cy.wait('@deleteUser').its('response.statusCode').should('eq', 200); 
  });

});