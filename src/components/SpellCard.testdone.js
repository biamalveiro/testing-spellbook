import { render, screen } from "@testing-library/react";
import SpellCard from "./SpellCard";

const testSpell = {
  Name: "Ducklifors Jinx",
  Incantation: "Ducklifors",
  Type: "Transfiguration, Jinx",
  Effect: "Turns organisms to ducks",
  Light: "Yellow or Purple",
};

test("should render spell name and description correctly", () => {
  // arrange
  render(<SpellCard spell={testSpell} />);

  // assert
  const header = screen.getByRole("heading");
  expect(header).toHaveTextContent(testSpell["Name"]);
  screen.getByText(testSpell["Effect"]);
});

test("should render incantation if it valid", () => {
  render(<SpellCard spell={testSpell} />);

  const header = screen.getByRole("heading");
  expect(header).toHaveTextContent(testSpell["Incantation"]);
});

test("should not render incantation if it Unknown or None", () => {
  const unknownTestSpell = {
    ...testSpell,
    Incantation: "Unknown",
  };
  render(<SpellCard spell={unknownTestSpell} />);

  const header = screen.getByRole("heading");
  expect(header).not.toHaveTextContent(unknownTestSpell["Incantation"]);
});

test("should render spell type tags correctly", () => {
  render(<SpellCard spell={testSpell} />);

  const testTypes = testSpell["Type"].split(",").map((t) => t.trim());

  const badges = screen.getAllByTestId("spell-type-badge");
  expect(badges).toHaveLength(testTypes.length);

  for (let index = 0; index < testTypes.length; index++) {
    expect(badges[index]).toHaveTextContent(testTypes[index]);
  }
});
