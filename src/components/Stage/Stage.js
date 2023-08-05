import { nanoid } from "nanoid";
import { useEffect, useRef } from "react";
import Match from "../Match/Match";
import convertStageTitle from "../../helpers/convertTitle";
import "./Stage.css";

function Stage({
  stageData,
  teamHover,
  hoveredTeamID,
  teamUnhover,
  specialStyle,
  getComponentCoordinates,
}) {
  const componentRef = useRef(null);
  const { matches, title } = stageData;
  useEffect(() => {
    getComponentCoordinates(componentRef.current);
  }, [stageData]);

  return (
    <div className={`stage ${specialStyle} `} ref={componentRef}>
      <div className="stage_title">{convertStageTitle(title)}</div>
      {matches.map((match) => {
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
