import { nanoid } from "nanoid";
import classnames from "classnames";
import { useState, useEffect } from "react";

function Team({ teamHover, teamInfo, winner, hoveredTeamID, teamUnhover }) {
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    if (teamInfo.id === hoveredTeamID) {
      setIsHovered(true);
    } else {
      setIsHovered(false);
    }
  }, [teamInfo.id, hoveredTeamID]);
  const teamClasses = classnames("team", {
    winner: winner,
    hover: isHovered,
  });

  return (
    <a
      href="/"
      key={nanoid()}
      onMouseEnter={(e) => teamHover(e)}
      onMouseLeave={() => teamUnhover()}
      data-team-id={teamInfo.id}
      className={teamClasses}>
      <img className="team_logo" src={teamInfo.image} alt="team logo" />
      <div className="team__name">{teamInfo.name}</div>
      <div className="team__score">{teamInfo.score}</div>
    </a>
  );
}

export default Team;
