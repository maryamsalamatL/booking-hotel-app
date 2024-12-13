import { startMsw } from "../../../../mocks/server";
import Bookmarks from "../Bookmarks";

describe("testing Bookmarks: ", () => {
  before(() => {
    startMsw();
  });

  it("should render loading, while data is loading", () => {
    cy.mount(<Bookmarks />);

    cy.contains("Data is Loading ...").should("exist");
  });

  it("should render bookmarks, when data loaded", () => {
    cy.mount(<Bookmarks />);

    cy.getByDataCy("bookmark-item").should("have.length", 3);
  });

  it("should delete bookmark item, when click on trash icon", () => {
    cy.mount(<Bookmarks />);
    // assert before delete
    cy.getByDataCy("bookmark-item").should("have.length", 3);

    // delete first item
    cy.getByDataCy("bookmark-item-trash").first().click();

    cy.getByDataCy("bookmark-item").should("have.length", 2);
  });

  it("should render correct text, when there is no bookmarks", () => {
    cy.mount(<Bookmarks />);

    cy.getByDataCy("bookmark-item-trash").then((elements) => {
      [...elements].map((el) => el.click());
    });

    cy.contains("there is no bookmarked location").should("exist");
  });
});
