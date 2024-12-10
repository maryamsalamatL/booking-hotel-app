import LocationList from "../LocationList";

describe("testing LocationList: ", () => {
  beforeEach(() => cy.mount(<LocationList />));
  
  it("should render title correctly", () => {
    cy.contains("Nearby Locations").should("exist");
  });

  it("should display loading when fetch items", () => {
    cy.contains("Data is Loading ...").should("exist");
  });

  it("should fetch location items", () => {
    cy.getByDataCy("location-item-link").should("exist");
  });

  // navigation tests with e2e test
});
