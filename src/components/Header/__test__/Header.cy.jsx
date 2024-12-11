import Header from "../Header";

describe("testing Header: ", () => {
  beforeEach(() => cy.mount(<Header />));

  it("should render elements", () => {
    cy.getByDataCy("search-input").should("exist");
    cy.getByDataCy("date-container").should("exist");
    cy.getByDataCy("option-container").should("exist");
    cy.getByDataCy("search-btn").should("exist");
  });

  it("should type on search input", () => {
    cy.getByDataCy("search-input").type("test text");
    cy.getByDataCy("search-input").should("have.value", "test text");
  });

  context("date picker testing: ", () => {
    it("should open calender when click on date-container", () => {
      cy.getByDataCy("date-container").click();
      cy.getByDataCy("date-drop-down").should("exist");
    });

    it("should not be able to select a date before today", () => {
      const today = new Date().getDate();
      cy.getByDataCy("date-container").click();

      if (today === 1) {
        const month = [
          "January",
          "February",
          "March",
          "April",
          "May",
          "June",
          "July",
          "August",
          "September",
          "October",
          "November",
          "December",
        ];
        const thisMonth = new Date().getMonth();

        cy.getByDataCy("date-drop-down").within(() => {
          cy.get(".rdrPprevButton").click();
          
          // calender should still show current month 
          cy.contains(month[thisMonth]).should("exist");
        });
      } else {
        cy.getByDataCy("date-drop-down").within(() => {
          cy.get(".rdrDay")
            .contains(today - 1)
            .click();

          cy.get(".rdrDay")
            .contains(today - 1)
            .parent()
            .parent()
            .within(() => {
              cy.get(".rdrStartEdge").should("not.exist");
            });
        });
      }
    });

    it("should show selected date", () => {
      cy.getByDataCy("date-container").click();
      cy.getByDataCy("date-drop-down").within(() => {
        cy.get(".rdrNextButton").click();

        cy.get(".rdrDayNumber").contains(14).click();
        cy.get(".rdrDayNumber").contains(16).click();
      });

      cy.get("body").click(0, 0);

      cy.getByDataCy("date-container")
        .should("include.text", "14")
        .and("include.text", "16");
    });
  });

  context("options testing: ", () => {
    it("should open option dropdown when click on option-container", () => {
      cy.getByDataCy("option-container").click();
      cy.getByDataCy("option-drop-down").should("exist");
    });

    it("should increment option(adult)", () => {
      cy.getByDataCy("option-container").click();
      cy.getByDataCy("option-drop-down").within(() => {
        cy.getByDataCy("adult-inc").click();
      });

      cy.get("body").click(0, 0);
      cy.getByDataCy("option-container").contains("2 Adult");
    });

    it("should decrement be disabled when the value is equal to minimum(children)", () => {
      cy.getByDataCy("option-container").click();
      cy.getByDataCy("option-drop-down").within(() => {
        cy.getByDataCy("children-dec").should("have.attr", "disabled");
      });
    });
  });

  context("useOutSideClick hook testing: ", () => {
    it("should close date dropdown when click outside of calender", () => {
      cy.getByDataCy("date-container").click();
      cy.get("body").click(0, 0);

      cy.getByDataCy("date-drop-down").should("not.exist");
    });

    it("should not close date dropdown when click inside of calender", () => {
      cy.getByDataCy("date-container").click();
      cy.getByDataCy("date-drop-down").click();

      cy.getByDataCy("date-drop-down").should("exist");
    });

    it("should close options dropdown when click outside of options", () => {
      cy.getByDataCy("option-container").click();
      cy.get("body").click(0, 0);

      cy.getByDataCy("option-drop-down").should("not.exist");
    });

    it("should not close options dropdown when click inside of options", () => {
      cy.getByDataCy("option-container").click();
      cy.getByDataCy("option-drop-down").click();

      cy.getByDataCy("option-drop-down").should("exist");
    });
  });
});
