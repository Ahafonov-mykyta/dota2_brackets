import classnames from "classnames";

const Line = ({ match, nextMatch, hoveredTeamID }) => {
  const сornerClassName = classnames("corner", {
    down: match.y < nextMatch.y,
    up: match.y > nextMatch.y,
    center: match.y === nextMatch.y,
    hover: hoveredTeamID === match.id,
  });
  console.log(match.y, " match");
  console.log(match.x, " Nextmatch");
  const connectorClassName = classnames("connector", {
    hover: hoveredTeamID === match.id,
  });

  const calculateLinePosition = (match, nextMatch) => {
    let coordinates = {
      left: match.x + match.w,
    };
    if (match.y < nextMatch.y) {
      coordinates.height = Math.abs(nextMatch.y - match.y);
      coordinates.top = match.y + match.h / 2 - 1;
    } else if (match.y > nextMatch.y) {
      coordinates.height = Math.abs(nextMatch.y - match.y) + 1;
      coordinates.top = match.y + match.h / 2 + nextMatch.y - match.y - 1;
    } else {
      coordinates.height = 2 + "px";
      coordinates.top = match.y + match.h / 2 + nextMatch.y - match.y - 1;
    }
    return coordinates;
  };

  return (
    <>
      <div
        className={connectorClassName}
        style={{
          width: nextMatch.x - match.x - match.w - 13 + "px",
          top: match.y + match.h / 2 + nextMatch.y - match.y - 1,
          left: match.x + match.w + 14,
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
