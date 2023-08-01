import { nanoid } from "nanoid";
import Match from "../Match/Match";
import "./Stage.css";

function Stage({ stageData, teamHover, hoveredTeamID, teamUnhover }) {
  const processStageTitle = (inputString) => {
    return inputString
      .replace(/_+/g, " ")
      .replace(/upper/g, "UB")
      .replace(/lower/g, "LB")
      .replace(/r1/g, "round 1")
      .replace(/r2/g, "round 2");
  };

  return (
    <div className="stage">
      <div className="stage_title">{processStageTitle(stageData.title)}</div>
      {stageData.matches.map((match) => {
        // console.log(checkIfTeamIsHovered(match.teams) + " функция ховера ");
        // console.log(hoveredTeamID, "hoveredTeamID");
        // console.log(match.teams[0].id, "Айди команды ");
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
