import { nanoid } from "nanoid";
import classnames from "classnames";
import { useState, useEffect } from "react";

function Team({ teamHover, teamInfo, winner, hoveredTeamID, teamUnhover }) {
  const [isHovered, setIsHovered] = useState(false);
  const { id, image, name, score } = teamInfo;

  useEffect(() => {
    id === hoveredTeamID ? setIsHovered(true) : setIsHovered(false);
  }, [id, hoveredTeamID]);

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
      data-team-id={id}
      className={teamClasses}>
      <img className="team_logo" src={image} alt="team logo" />
      <div className="team__name">{name}</div>
      <div className="team__score">{score}</div>
    </a>
  );
}

export default Team;
