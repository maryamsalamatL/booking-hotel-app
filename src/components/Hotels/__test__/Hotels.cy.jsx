import { startMsw } from "../../../../mocks/server";
import Hotels from "../Hotels";

describe("testing BookmarksLayout: ", () => {
  before(() => {
    startMsw();
  });

  beforeEach(() => cy.mount(<Hotels />));
  
  it("should render title correctly", () => {
    cy.contains("Search Result").should("exist");
  });

  it("should render loading, while data is loading", () => {
    cy.contains("Data is Loading ...").should("exist");
  });

  it("should render hotels, when data loaded", () => {
    cy.getByDataCy("hotel-item").should("have.length", 3);
  });
});
