// new-ticket.spec.ts created with Cypress
//
// Start writing your Cypress tests below!
// If you're unfamiliar with how Cypress works,
// check out the link below and learn how to write your first test:
// https://on.cypress.io/writing-first-test
/* ==== Test Created with Cypress Studio ==== */
// it('create new ticket', function() {
//   /* ==== Generated with Cypress Studio ==== */
//   // cy.visit('http://localhost:3000/')
//   //     cy.get('.MuiButton-root').click()
//   //     cy.findByLabelText(/description/i)
//   //     cy.click()
//   //     cy.type('this is a new ticket')
//   //     cy.findByText(/save/i)
//   //     cy.click()
//   //     cy.findByText(/this is a new ticket/i, {ignore: 'textarea'})
//   //     cy.should('exist');
//   /* ==== End Cypress Studio ==== */
// });
/* ==== Test Created with Cypress Studio ==== */
it('create new ticket', function() {
  /* ==== Generated with Cypress Studio ==== */
  let baseUrl = Cypress.config().baseUrl;
  cy.visit(`${baseUrl}`);
  cy.findByText(/New Ticket/i).click();
  cy.url().should('eq', (`${baseUrl}/tickets\/new`))
  cy.findByLabelText(/description/i).type("write a cypress test");
  cy.findByText(/save/i).click();
  cy.url().should('match', new RegExp(`${baseUrl}/tickets\/([0-9]|[1-9][0-9]|[1-9][0-9][0-9])`));
  cy.findByText(/write a cypress test/i, {ignore: 'textarea'}).should('exist');
  /* ==== End Cypress Studio ==== */
});
