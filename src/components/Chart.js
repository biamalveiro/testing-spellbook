import React, { useState, useEffect } from "react";
import { isNull } from "lodash";

import { max } from "d3-array";
import { scaleBand, scaleLinear } from "@visx/scale";
import { GridColumns } from "@visx/grid";
import { Group } from "@visx/group";
import { AxisLeft, AxisTop } from "@visx/axis";
import { Text } from "@visx/text";

import { getSpells } from "../api";
import useChartDimensions from "../useChartDimensions";
import { getSpellsGroupedByType } from "../utils";
import colors from "../colors";

export default function Chart({ setActiveType, activeType }) {
  const [spellTypeGroups, setSpellTypeGroups] = useState([]);
  const [chartWrapperRef, dimensions] = useChartDimensions({
    marginLeft: 100,
    marginRight: 50,
  });

  useEffect(() => {
    getSpells().then((spells) => {
      setSpellTypeGroups(getSpellsGroupedByType(spells));
    });
  }, []);

  const yScale = scaleBand({
    domain: spellTypeGroups
      .sort((a, b) => a.group.length - b.group.length)
      .map((d) => d.name),
    range: [dimensions.boundedHeight, 0],
    align: 0.5,
    paddingInner: 0.2,
    paddingOuter: 0.2,
  });

  const xScale = scaleLinear({
    domain: [0, max(spellTypeGroups, (t) => t.group.length)],
    range: [0, dimensions.boundedWidth],
    nice: true,
  });

  const activeTypeGroupObject = spellTypeGroups.filter(
    (g) => g.name === activeType
  )[0] || { name: "", group: [] };

  console.log(spellTypeGroups);

  return (
    <div ref={chartWrapperRef} className="w-2/3 h-5/6">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        role="img"
        width={dimensions.width}
        height={dimensions.height}
      >
        <Group top={dimensions.marginTop} left={dimensions.marginLeft}>
          <rect
            x={0}
            y={0}
            fill="transparent"
            height={dimensions.boundedHeight}
            width={dimensions.boundedWidth}
            onClick={() => setActiveType(null)}
          />
          <AxisLeft
            scale={yScale}
            numTicks={spellTypeGroups.length}
            hideTicks
            hideAxisLine
          />
          <AxisTop scale={xScale} hideTicks hideAxisLine />
          <GridColumns
            scale={xScale}
            height={dimensions.boundedHeight}
            stroke="#E5E7EB"
          />
          {spellTypeGroups.map((type) => (
            <rect
              data-testid={`chart-bar-${type.name}`}
              key={`bar-${type.name}`}
              x={0}
              y={yScale(type.name)}
              height={yScale.bandwidth()}
              width={xScale(type.group.length)}
              fill={
                !isNull(activeType) && activeType !== type.name
                  ? colors.purpleLight
                  : colors.purple
              }
              onClick={() => setActiveType(type.name)}
              style={{ cursor: "pointer" }}
            />
          ))}
          {!isNull(activeType) ? (
            <Text
              y={yScale(activeType) + yScale.bandwidth() / 2}
              x={xScale(activeTypeGroupObject.group.length)}
              dx={10}
              fill={colors.purple}
              verticalAnchor="middle"
            >
              {activeTypeGroupObject.group.length}
            </Text>
          ) : null}
        </Group>
      </svg>
    </div>
  );
}
