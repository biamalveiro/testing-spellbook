// Accessors

export const accessors = {
  type: (spell) => spell["Type"].split(","),
  name: (spell) => spell["Name"],
  effect: (spell) => spell["Effect"],
  incantation: (spell) => spell["Incantation"],
};

// Data Utils

export const getSpellsGroupedByType = (spells) => {
  const spellTypes = [
    ...new Set(
      spells
        .flatMap((spell) => accessors.type(spell))
        .map((type) => type.trim())
    ),
  ];

  const spellTypeGroups = [];

  for (const spellType of spellTypes) {
    const spellsOfType = spells.filter((spell) =>
      accessors
        .type(spell)
        .map((t) => t.trim())
        .includes(spellType)
    );

    spellTypeGroups.push({ name: spellType, group: spellsOfType });
  }

  return spellTypeGroups;
};
