import Input from "../Input";

describe("testing Input: ", () => {
  it("should show label correctly", () => {
    cy.mount(<Input label={"test label"} value={""} onChange={() => {}} />);

    cy.getByDataCy("input-label").should("include.text", "test label");
  });

  it("should input have initial value", () => {
    cy.mount(<Input label={""} value={"test value"} onChange={() => {}} />);

    cy.getByDataCy("input").should("have.value", "test value");
  });

  it("should onChange been called when type", () => {
    const onChangeSpy = cy.spy().as("onChangeSpy");
    cy.mount(<Input label={""} value={""} onChange={onChangeSpy} />);

    cy.getByDataCy("input").type("some text");

    cy.get("@onChangeSpy").should("have.been.called");
  });
});
