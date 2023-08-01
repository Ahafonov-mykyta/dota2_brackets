import "./Tournament.css";
import { useState } from "react";
import Bracket from "../Bracket/Bracket";

function Tournament({ brackets }) {
  const [hoveredTeamID, setHoveredTeamID] = useState(0);
  const bracketsKeys = Object.keys(brackets);

  const teamIsHovered = (e) => {
    setHoveredTeamID(Number(e.currentTarget.dataset.teamId));
  };

  const teamIsUnhovered = (e) => {
    setHoveredTeamID(0);
  };

  return (
    <div className="tournament">
      {bracketsKeys.map((key) => (
        <Bracket
          type={key}
          bracketInfo={brackets}
          key={key}
          teamHover={teamIsHovered}
          hoveredTeamID={hoveredTeamID}
          teamUnhover={teamIsUnhovered}
        />
      ))}
    </div>
  );
}

export default Tournament;
