import { render, screen, act, fireEvent } from "@testing-library/react";
import * as api from "./api";
import App from "./App";

const testSpells = [
  {
    Name: "Summoning Charm",
    Incantation: "Accio",
    Type: "Charm",
    Effect: "Summons an object",
    Light: "None",
  },
  {
    Name: "Age Line",
    Incantation: "Unknown",
    Type: "Charm",
    Effect:
      "Prevents people above or below a certain age from access to a target",
    Light: "Blue",
  },
  {
    Name: "Water-Making Spell",
    Incantation: "Aguamenti",
    Type: "Conjuration",
    Effect: "Conjures water",
    Light: "Icy blue",
  },
  {
    Name: "Launch an object up into the air",
    Incantation: "Alarte Ascendare",
    Type: "Hex",
    Effect: "Rockets target upward",
    Light: "Red",
  },
];

jest.mock("./api.js");

test("click on bar should filter spell list for that spell type ", async () => {
  api.getSpells.mockResolvedValue(testSpells);
  await act(async () => render(<App />));

  const clickType = "Charm";

  const barToClick = screen.getByTestId(`chart-bar-${clickType}`);

  fireEvent.click(barToClick);

  const spellList = screen.queryAllByTestId("spellcard");
  expect(spellList).toHaveLength(2);
});
