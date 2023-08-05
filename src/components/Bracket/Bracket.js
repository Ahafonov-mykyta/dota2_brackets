import { nanoid } from "nanoid";
import classnames from "classnames";
import "./Bracket.css";
import Stage from "../Stage/Stage";

function Bracket({
  type,
  bracketInfo,
  teamHover,
  hoveredTeamID,
  teamUnhover,
  getComponentCoordinates,
}) {
  const isUpperBracket = type === "upper" ? true : false;
  const numberOfUpperQuarterFinalMatches = bracketInfo[type][0].matches.length;
  const numberOfLowerStages = bracketInfo[type].length;
  const bracketClassName = classnames("tournament_bracket", {
    upper: isUpperBracket,
    big: isUpperBracket && numberOfUpperQuarterFinalMatches >= 4,
    small: isUpperBracket && numberOfUpperQuarterFinalMatches < 4,
    lower: !isUpperBracket,
    short: !isUpperBracket && numberOfLowerStages === 4,
    long: !isUpperBracket && numberOfLowerStages !== 4,
  });

  const checkStageStyle = (stage) => {
    return bracketInfo[type][0].matches.length === 4 &&
      stage.matches.length === 2
      ? "double--special"
      : "";
  };

  return (
    <div className={bracketClassName}>
      {bracketInfo[type].map((stage) => {
        return (
          <Stage
            stageData={stage}
            key={nanoid()}
            teamHover={teamHover}
            hoveredTeamID={hoveredTeamID}
            teamUnhover={teamUnhover}
            specialStyle={checkStageStyle(stage)}
            getComponentCoordinates={getComponentCoordinates}
          />
        );
      })}
    </div>
  );
}

export default Bracket;
