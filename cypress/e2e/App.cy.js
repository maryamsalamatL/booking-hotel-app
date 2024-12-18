import { createSearchParams } from "react-router-dom";

describe("template spec", () => {
  beforeEach(() => cy.visit("http://localhost:5173/"));

  context("Home page ", () => {
    it("visual testing", () => {
      cy.getByDataCy("header-back-layer").should("exist");
      cy.getByDataCy("header").should("exist");
      cy.getByDataCy("nearby-locations").should("exist");
    });

    it("should navigate to /hotels/id, when click on any item", () => {
      cy.getByDataCy("location-item-link").first().click();

      cy.getByDataCy("single-hotel").should("exist");
      cy.getByDataCy("hotel-map").should("exist");

      // assert item information
      cy.contains("Nice room at Vondelpark").should("exist");

      // assert map tip
      cy.getByDataCy("map-tip").should("exist");

      // back to home
      cy.getByDataCy("header-home-link").click();
      cy.getByDataCy("nearby-locations").should("exist");

      // assert last active hotel class
      cy.getByDataCy("location-item-link")
        .children()
        .first()
        .should("have.class", "currentHotel");
    });
  });

  context("Search testing", () => {
    it("should search by destination and navigate to /hotels?...", () => {
      cy.getByDataCy("search-input").type("espania");

      cy.getByDataCy("search-btn").click();

      cy.getByDataCy("hotels-list").should("exist");

      cy.url()
        .should("include", "http://localhost:5173/hotels?")
        .and("include", "destination=espania");

      // should navigate to /hotels/id when click on search result items
      cy.getByDataCy("hotel-item").click();

      cy.getByDataCy("single-hotel").should("exist");
    });

    it("should search by rooms and navigate to /hotels?...", () => {
      cy.getByDataCy("option-container").click();
      cy.getByDataCy("adult-inc").click();

      cy.getByDataCy("search-btn").click();

      const encodedParams = createSearchParams({
        options: JSON.stringify({ adult: 2, children: 0, room: 1 }),
      });

      cy.url()
        .should("include", "http://localhost:5173/hotels?")
        .and("include", encodedParams.toString());

      cy.getByDataCy("hotel-item").then((list) => {
        // assert map markers
        cy.get(".leaflet-marker-icon").should("have.length", [...list].length);
      });
    });
  });

  context("Login testing", () => {
    beforeEach(() => {
      cy.login().then(() => {
        // assert localStorage
        expect(JSON.parse(localStorage.getItem("user"))).to.exist;
      });
    });

    it("should login properly", () => {
      // assert header
      cy.getByDataCy("header-back-layer").within(() => {
        cy.getByDataCy("user-name").should("exist");
        cy.getByDataCy("login-link").should("not.exist");
      });

      // assert navigation
      cy.url().should("eq", "http://localhost:5173/");
    });

    it("should logout properly", () => {
      cy.getByDataCy("logout-btn")
        .click()
        .then(() => {
          // assert localStorage
          expect(JSON.parse(localStorage.getItem("user"))).to.equal(null);
        });

      // assert header
      cy.getByDataCy("header-back-layer").within(() => {
        cy.getByDataCy("user-name").should("not.exist");
        cy.getByDataCy("login-link").should("exist");
      });
    });
  });

  context("Protected Routes testing", () => {
    it("should protect /bookmarks route, if user is not authenticated", () => {
      cy.getByDataCy("header-bookmark-link").click();

      // assert toast
      cy.contains("To access the bookmarks, please login first.").should(
        "exist"
      );

      // assert url
      cy.url().should("eq", "http://localhost:5173/login");
    });

    it("should protect /bookmarks/add route, if user is not authenticated", () => {
      cy.getByDataCy("location-item").first().click();
      cy.getByDataCy("hotel-map").click(50, 50);

      // assert toast
      cy.contains("To bookmark any location, please login first.").should(
        "exist"
      );

      // assert url
      cy.url().should("eq", "http://localhost:5173/login");
    });

    it("should /bookmarks route be accessible, if user is authenticated", () => {
      cy.getByDataCy("header-bookmark-link").click();
      cy.login();

      cy.getByDataCy("header-bookmark-link").click();

      // assert url
      cy.url().should("eq", "http://localhost:5173/bookmarks");
    });

    it("should /bookmarks/add be accessible, if user is authenticated", () => {
      cy.getByDataCy("location-item").first().click();
      cy.getByDataCy("hotel-map").click(50, 50);
      cy.login();

      cy.getByDataCy("location-item").first().click();
      cy.getByDataCy("hotel-map").click(50, 50);

      // assert url
      cy.url().should("include", "http://localhost:5173/bookmarks/add");
    });
  });

  context("Bookmarks testing", () => {
    beforeEach(() => cy.login());

    it("should navigate to bookmarks/add by clicking on map when bookmark route", () => {
      cy.getByDataCy("header-bookmark-link").click();

      // assert bookmarksLayout
      cy.getByDataCy("bookmarks-sidebar").should("exist");
      cy.getByDataCy("bookmarks-map").should("exist");

      cy.getByDataCy("bookmarks-map").click(40, 10);

      // assert url
      cy.url()
        .should("include", "http://localhost:5173/bookmarks/add")
        .and("include", "lat")
        .and("include", "lng");

      cy.getByDataCy("add-bookmark-form").within(() => {
        cy.get("#city").invoke("val").should("not.be.empty");
        cy.get("#country").invoke("val").should("not.be.empty");
      });

      // back
      cy.getByDataCy("bookmark-back-btn").click();

      // assert url
      cy.url().should("eq", "http://localhost:5173/bookmarks");
    });

    it("should navigate to bookmarks/add by clicking on map when hotels route", () => {
      cy.getByDataCy("search-btn").click();

      cy.getByDataCy("hotel-map").click(80, 80);

      // assert url
      cy.url()
        .should("include", "http://localhost:5173/bookmarks/add")
        .and("include", "lat")
        .and("include", "lng");

      cy.getByDataCy("add-bookmark-form").within(() => {
        cy.get("#city").invoke("val").should("not.be.empty");
        cy.get("#country").invoke("val").should("not.be.empty");
      });

      // back
      cy.getByDataCy("bookmark-back-btn").click();

      // assert url
      cy.url().should("include", "http://localhost:5173/hotels");
    });

    it("should add and delete bookmark", () => {
      cy.getByDataCy("header-bookmark-link").click();
      cy.getByDataCy("bookmarks-map").click(40, 10);

      cy.get("#country").type("{selectall}{backspace}").type("test country");

      // add
      cy.getByDataCy("add-bookmark-btn").click();

      // assert new item
      cy.contains("test country").as("new-bookmark");
      cy.get("@new-bookmark").should("exist");

      // assert style
      cy.get("@new-bookmark")
        .children()
        .first()
        .should("have.class", "currentHotel");

      // navigate to single bookmark
      cy.get("@new-bookmark").click();

      // assert url
      cy.url().should("include", "http://localhost:5173/bookmarks/");

      cy.getByDataCy("single-bookmark").should("exist");

      // back
      cy.getByDataCy("single-bookmark-back-btn").click();

      // delete new item
      cy.get("@new-bookmark").within(() =>
        cy.getByDataCy("bookmark-item-trash").click()
      );

      cy.get("@new-bookmark").should("not.exist");
    });
  });
});
