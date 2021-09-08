import { render, screen, act } from "@testing-library/react";
import Chart from "./Chart";
import * as api from "../api";
import { getSpellsGroupedByType } from "../utils";
import colors from "../colors";

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
    Type: "Charm,Conjuration",
    Effect: "Conjures water",
    Light: "Icy blue",
  },
  {
    Name: "Launch an object up into the air",
    Incantation: "Alarte Ascendare",
    Type: "Charm,Hex",
    Effect: "Rockets target upward",
    Light: "Red",
  },
];

jest.mock("../api.js");

beforeEach(() => {
  api.getSpells.mockResolvedValue(testSpells);
});

afterEach(() => {
  api.getSpells.mockRestore();
});

test("should render a bar for each spell type ", async () => {
  const setActiveType = jest.fn();

  await act(async () =>
    render(<Chart activeType={null} setActiveType={setActiveType} />)
  );

  const bars = screen.queryAllByTestId(/chart-bar/);
  expect(bars).toHaveLength(getSpellsGroupedByType(testSpells).length);

  api.getSpells.mockRestore();
});

test("active type bar should be highlighted", async () => {
  const spellTypes = getSpellsGroupedByType(testSpells);
  const activeType = spellTypes[0].name;
  const setActiveType = jest.fn();

  await act(async () =>
    render(<Chart activeType={activeType} setActiveType={setActiveType} />)
  );

  const activeBar = screen.queryByTestId(`chart-bar-${activeType}`);
  expect(activeBar).toHaveAttribute("fill", colors.purple);

  const inactiveBarsRegex = new RegExp(`chart-bar-(?!${activeType})`);
  const inactiveBars = screen.queryAllByTestId(inactiveBarsRegex);

  for (const bar of inactiveBars) {
    expect(bar).toHaveAttribute("fill", colors.purpleLight);
  }
});

test("should match chart snapshot", async () => {
  const setActiveType = jest.fn();

  await act(async () =>
    render(<Chart activeType={null} setActiveType={setActiveType} />)
  );

  const chart = screen.getByRole("img");

  expect(chart).toMatchSnapshot();
});
