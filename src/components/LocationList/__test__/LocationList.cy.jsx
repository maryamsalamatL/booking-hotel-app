import LocationList from "../LocationList";
import { startMsw } from "../../../../mocks/server";

describe("testing LocationList: ", () => {
  before(() => {
    startMsw();
  });

  beforeEach(() => cy.mount(<LocationList />));

  it("should render title correctly", () => {
    cy.contains("Nearby Locations").should("exist");
  });

  it("should render loading, while data is loading", () => {
    cy.contains("Data is Loading ...").should("exist");
  });

  it("should render location items, when data loaded", () => {
    cy.getByDataCy("location-item-link").should("have.length", 3);
  });

  // navigation tests with e2e test
});
