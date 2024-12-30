import { useCurrentHotelId } from "../../context/HotelsProvider";
import LocationItem from "../LocationItem";
import styles from "./test.module.scss";

const fakeItem = {
  id: "6017649",
  name: "Nice room at Vondelpark",
  thumbnail_url:
    "https://a0.muscache.com/im/pictures/74942550/415cd752_original.jpg?aki_policy=small",
  smart_location: "Amsterdam, Netherlands",
  price: 50,
};

describe("testing LocationItem: ", () => {
  it("should render correctly", () => {
    cy.mount(<LocationItem styles={{}} {...fakeItem} />);

    cy.contains("Amsterdam, Netherlands").should("exist");
    cy.contains("50").should("exist");
  });

  it("should take styles from props", () => {
    cy.mount(<LocationItem styles={styles} {...fakeItem} />);

    cy.getByDataCy("location-item").should("have.css", "display", "flex");
  });

  it("should img have placeholder when any error occurred", () => {
    // wrong img-url
    const fakeLocation = {
      ...fakeItem,
      thumbnail_url:
        "https://a0.muscae.com/im/pictures/74942550/415cd752_original.jpg?aki_policy=small",
    };

    cy.mount(<LocationItem styles={{}} {...fakeLocation} />);

    cy.getByDataCy("location-item").within(() => {
      cy.get("img")
        .should("have.attr", "src")
        .and("include", "/assets/placeholder.png");
    });
  });
});
