import { nanoid } from "nanoid";
import classnames from "classnames";
import "./Bracket.css";
import Stage from "../Stage/Stage";

function Bracket({ type, bracketInfo, teamHover, hoveredTeamID, teamUnhover }) {
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
          />
        );
      })}
    </div>
  );
}

export default Bracket;
