import "./Tournament.css";
import { useEffect, useState } from "react";
import Bracket from "../Bracket/Bracket";
import Scheme from "../Scheme/Scheme";

function Tournament({ brackets }) {
  const [hoveredTeamID, setHoveredTeamID] = useState(0);
  const bracketsKeys = Object.keys(brackets);
  let matchesCoordinates = {
    upper: [],
    lower: [],
  };

  useEffect(() => {
    matchesCoordinates = {
      upper: [],
      lower: [],
    };
  });

  const teamIsHovered = (e) => {
    setHoveredTeamID(Number(e.currentTarget.dataset.teamId));
  };

  const teamIsUnhovered = (e) => {
    setHoveredTeamID(0);
  };

  const getComponentCoordinates = (element) => {
    const childrenArray = Array.from(element.children);
    const coordinatesOfChildren = [];
    childrenArray.map((child) => {
      const { top, left, width, height } = child.getBoundingClientRect();
      const winner = Array.from(child.children).find((el) =>
        el.classList.contains("winner")
      );
      const winnerId = winner ? Number(winner.dataset.teamId) : null;
      coordinatesOfChildren.push({
        y: top + window.scrollY,
        x: left,
        w: width,
        h: height,
        id: winnerId,
      });
    });
    coordinatesOfChildren.shift(); // уудаляем заголовок
    element.parentElement.classList.contains("upper")
      ? matchesCoordinates.upper.push(coordinatesOfChildren)
      : matchesCoordinates.lower.push(coordinatesOfChildren);
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
          getComponentCoordinates={getComponentCoordinates}
        />
      ))}
      <Scheme
        matchesCoordinates={matchesCoordinates}
        hoveredTeamID={hoveredTeamID}
      />
    </div>
  );
}

export default Tournament;
