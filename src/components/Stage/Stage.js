import { nanoid } from "nanoid";
import { useEffect, useRef } from "react";
import Match from "../Match/Match";
import "./Stage.css";

function Stage({
  stageData,
  teamHover,
  hoveredTeamID,
  teamUnhover,
  specialStyle,
  getComponentCoordinates,
}) {
  const processStageTitle = (inputString) => {
    return inputString
      .replace(/_+/g, " ")
      .replace(/upper/g, "UB")
      .replace(/lower/g, "LB")
      .replace(/r1/g, "round 1")
      .replace(/r2/g, "round 2");
  };

  const componentRef = useRef(null);

  useEffect(() => {
    getComponentCoordinates(componentRef.current);
  }, [stageData]);

  return (
    <div className={`stage ${specialStyle} `} ref={componentRef}>
      <div className="stage_title">{processStageTitle(stageData.title)}</div>
      {stageData.matches.map((match) => {
        return (
          <Match
            matchData={match}
            key={nanoid()}
            teamHover={teamHover}
            hoveredTeamID={hoveredTeamID}
            teamUnhover={teamUnhover}
          />
        );
      })}
    </div>
  );
}

export default Stage;
