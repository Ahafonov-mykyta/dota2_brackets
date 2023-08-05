import classnames from "classnames";

const Line = ({ match, nextMatch, hoveredTeamID }) => {
  const сornerClassName = classnames("corner", {
    down: match.y < nextMatch.y,
    up: match.y > nextMatch.y,
    center: match.y === nextMatch.y,
    hover: hoveredTeamID === match.id,
  });

  const connectorClassName = classnames("connector", {
    hover: hoveredTeamID === match.id,
  });

  const calculateLinePosition = (match, nextMatch) => {
    if (match.y < nextMatch.y) {
      return {
        height: Math.abs(nextMatch.y - match.y),
        top: match.y + match.h / 2 - 1,
        left: match.x + match.w,
      };
    } else if (match.y > nextMatch.y) {
      return {
        height: Math.abs(nextMatch.y - match.y),
        top: match.y + match.h / 2 + nextMatch.y - match.y + 1,
        left: match.x + match.w,
      };
    } else {
      return {
        height: 2 + "px",
        top: match.y + match.h / 2 + nextMatch.y - match.y - 1,
        left: match.x + match.w,
      };
    }
  };

  return (
    <>
      <div
        className={connectorClassName}
        style={{
          width: nextMatch.x - match.x - match.w - 13 + "px",
          top: match.y + match.h / 2 + nextMatch.y - match.y - 1,
          left: match.x + match.w + 13,
        }}
        data-winner-id={match.id}></div>

      <div
        className={сornerClassName}
        style={calculateLinePosition(match, nextMatch)}
        data-winner-id={match.id}></div>
    </>
  );
};

export default Line;
