Cypress.Commands.add("getByDataCy", (dataCy) => cy.get(`[data-cy=${dataCy}]`));
