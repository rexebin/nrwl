describe('new ticket', () => {
    it('create new ticket', function () {
        let baseUrl = Cypress.config().baseUrl;
        cy.visit(`${baseUrl}`);
        cy.findByText(/New Ticket/i).click();
        cy.url().should('eq', (`${baseUrl}/tickets\/new`))
        cy.findByLabelText(/description/i).type("write a cypress test");
        cy.findByText(/save/i).click();
        cy.url().should('match', new RegExp(`${baseUrl}/tickets\/([0-9]|[1-9][0-9]|[1-9][0-9][0-9])`));
        cy.findByText(/write a cypress test/i, {ignore: 'textarea'}).should('exist');
    });

})
