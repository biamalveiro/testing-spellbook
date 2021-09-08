import React, { useState, useEffect } from "react";
import { isNull } from "lodash";

import { accessors } from "../utils";
import { getSpells } from "../api";

import SpellCard from "./SpellCard";

export default function SpellList({ activeType }) {
  const [spells, setSpells] = useState([]);

  useEffect(() => {
    getSpells().then((spells) => {
      setSpells(spells);
    });
  }, []);

  const filteredSpells = spells.filter((spell) => {
    if (isNull(activeType)) return true;
    return accessors.type(spell).includes(activeType);
  });

  return (
    <div className="w-1/3 overflow-y-scroll h-5/6 mt-4">
      {filteredSpells.map((spell) => (
        <SpellCard key={`key-${accessors.name(spell)}`} spell={spell} />
      ))}
    </div>
  );
}
