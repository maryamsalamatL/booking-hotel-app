import Map from "../Map";

const Container = ({ children }) => (
  <div style={{ width: "100%", height: "100vh" }}>{children}</div>
);

describe("testing Map", () => {
  it("should render map, without any marker", () => {
    cy.mount(
      <Container>
        <Map markerLocations={[]} />
      </Container>
    );

    cy.get(".leaflet-container").should("exist");
    cy.get(".leaflet-marker-icon").should("not.exist");
  });

  it("should render map, with location marker", () => {
    cy.mount(
      <Container>
        <Map
          markerLocations={[
            {
              latitude: "38.810820900566156",
              longitude: "39.030303955078125",
              host_location: "Elazığ - Turkey",
              id: 1,
            },
          ]}
        />
      </Container>
    );

    cy.get(".leaflet-marker-icon").should("exist");
  });

  it("should show location name, when click on location marker", () => {
    cy.mount(
      <Container>
        <Map
          markerLocations={[
            {
              latitude: "38.810820900566156",
              longitude: "39.030303955078125",
              host_location: "Elazığ - Turkey",
              id: 1,
            },
          ]}
        />
      </Container>
    );

    cy.get(".leaflet-marker-icon").click({ force: true });
    cy.get(".leaflet-popup").should("include.text", "Elazığ - Turkey");
  });

  it("should show tip, on component first mount", () => {
    cy.mount(
      <Container>
        <Map markerLocations={[]} />
      </Container>
    );

    // assert localStorage
    expect(JSON.parse(localStorage.getItem("tip"))).to.equal(null);

    cy.getByDataCy("map-tip").should("have.css", "opacity", "1");
  });

  it("should hide tip, when it is seen", () => {
    cy.mount(
      <Container>
        <Map markerLocations={[]} />
      </Container>
    );

    cy.getByDataCy("map-tip").should("have.css", "opacity", "1");

    cy.getByDataCy("map-tip-btn")
      .click()
      .then(() => {
        // assert localStorage
        expect(JSON.parse(localStorage.getItem("tip"))).to.equal(true);
      });

    // rerender
    cy.mount(
      <Container>
        <Map markerLocations={[]} />
      </Container>
    );

    cy.getByDataCy("map-tip").should("have.css", "opacity", "0");
  });

  it("should display loading, while loading userLocation", () => {
    cy.mount(
      <Container>
        <Map markerLocations={[]} />
      </Container>
    );

    cy.getByDataCy("map-user-location-btn").click();
    cy.getByDataCy("map-user-location-btn").should(
      "include.text",
      "Loading ..."
    );
  });
});
