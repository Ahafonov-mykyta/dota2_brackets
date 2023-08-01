import { nanoid } from "nanoid";

import "./Match.css";
import Team from "../Team/Team";

function Match({ matchData, teamHover, hoveredTeamID, teamUnhover }) {
  const matchWinnerIndex =
    matchData.teams[0].score > matchData.teams[1].score ? 0 : 1;

  return (
    <div className="match">
      {matchData.teams.map((team, index) => {
        return (
          <Team
            hoveredTeamID={hoveredTeamID}
            teamHover={teamHover}
            teamInfo={team}
            winner={matchWinnerIndex === index}
            key={nanoid()}
            teamUnhover={teamUnhover}
          />
        );
      })}
    </div>
  );
}

export default Match;
