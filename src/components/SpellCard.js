import React from "react";

import { accessors } from "../utils";

export default function SpellCard({ spell }) {
  return (
    <div
      className=" bg-white shadow-md rounded border border-gray-200 m-1 mr-4 p-3"
      data-testid="spellcard"
    >
      <h1 className="font-semibold">
        {accessors.name(spell)}
        {!["Unknown", "None"].includes(accessors.incantation(spell)) ? (
          <span className="italic font-light text-purple-400 ml-1">
            {accessors.incantation(spell)}
          </span>
        ) : null}
      </h1>

      <p>
        {accessors.type(spell).map((type) => (
          <span
            data-testid={"spell-type-badge"}
            key={`${accessors.name(spell)}-${type}-badge`}
            className=" bg-purple-500 rounded text-xs py-0.5 px-1.5 mr-1 text-white"
          >
            {type}
          </span>
        ))}
      </p>
      <p>{accessors.effect(spell)}</p>
    </div>
  );
}
