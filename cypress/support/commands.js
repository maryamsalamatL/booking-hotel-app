Cypress.Commands.add("getByDataCy", (dataCy) => cy.get(`[data-cy=${dataCy}]`));

Cypress.Commands.add("login", () => {
  cy.getByDataCy("login-link").click();

  cy.getByDataCy("login-form").within(() => {
    // type FAKE_USER info
    cy.get("#email").type("test@gmail.com");
    cy.get("#password").type("1234");

    cy.getByDataCy("login-btn").click();
  });
});
