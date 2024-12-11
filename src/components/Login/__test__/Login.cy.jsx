import Login from "../Login";

describe("testing Login: ", () => {
  beforeEach(() => cy.mount(<Login />));

  it("should email input be typeable", () => {
    cy.getByDataCy("login-form").within(() => {
      cy.get("#email").type("test@gmail.com");

      cy.get("#email").should("have.value", "test@gmail.com");
    });
  });

  it("should password input be typeable", () => {
    cy.getByDataCy("login-form").within(() => {
      cy.get("#password").type("1234");

      cy.get("#password").should("have.value", "1234");
    });
  });

  it("should submit button be disabled, until both inputs have value", () => {
    cy.getByDataCy("login-form").within(() => {
      cy.getByDataCy("login-btn").should("be.disabled");

      cy.get("#email").type("test@gmail.com");
      cy.getByDataCy("login-btn").should("be.disabled");

      cy.get("#password").type("1234");
      cy.getByDataCy("login-btn").should("not.be.disabled");
    });
  });
});
