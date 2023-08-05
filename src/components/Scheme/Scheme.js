import "./Scheme.css";
import Line from "../Line.js/Line";
import { nanoid } from "nanoid";
import { memo, useEffect, useState } from "react";

function Scheme({ matchesCoordinates, hoveredTeamID }) {
  const [coordinates, setCoordinates] = useState(null);
  const coordinatesKeys = coordinates ? Object.keys(coordinates) : null;

  useEffect(() => {
    setCoordinates(matchesCoordinates);
  }, [matchesCoordinates]);

  return (
    <>
      {coordinatesKeys && coordinates && coordinates.upper[0][0].x ? (
        <>
          {coordinatesKeys.map((key) => {
            return coordinates[key].map((stageMatches, i) => {
              if (stageMatches.length === i - 2 && key === "upper") {
                return null;
              }

              let nextStage = coordinates[key][i + 1]
                ? coordinates[key][i + 1]
                : coordinates.upper[coordinates.upper.length - 1];

              let nextMatchIndex = 0;
              return stageMatches.map((match, y) => {
                if (stageMatches.length > nextStage.length) {
                  nextMatchIndex =
                    y % 3 === 2 ? nextMatchIndex + 1 : nextMatchIndex;
                } else {
                  nextMatchIndex = y;
                }
                return (
                  <Line
                    key={nanoid()}
                    match={match}
                    nextMatch={nextStage[nextMatchIndex]}
                    hoveredTeamID={hoveredTeamID}
                  />
                );
              });
            });
          })}
        </>
      ) : null}
    </>
  );
}

export default memo(Scheme);
