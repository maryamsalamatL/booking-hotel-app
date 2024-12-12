import AddNewBookmark from "../AddNewBookmark";

describe("testing AddNewBookmark: ", () => {
  beforeEach(() => cy.mount(<AddNewBookmark />));

  it("should city input be typeable", () => {
    cy.getByDataCy("add-bookmark-form").within(() => {
      cy.get("#city").type("Tabriz");

      cy.get("#city").should("have.value", "Tabriz");
    });
  });

  it("should country input be typeable", () => {
    cy.getByDataCy("add-bookmark-form").within(() => {
      cy.get("#country").type("Iran");

      cy.get("#country").should("have.value", "Iran");
    });
  });

  // form submit and lng lat tests => e2e test
});
