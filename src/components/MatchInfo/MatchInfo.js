import { useState, useEffect } from "react";
import { nanoid } from "nanoid";
import "./MatchInfo.css";
import InteractiveMap from "../InteractiveMap/InteractiveMap";
import CircularProgress from "@mui/material/CircularProgress";
import { getPlayersNicknames } from "../../helpers/getPlayerNameByAccountID";
import transformTimeFormat from "../../helpers/timeFormat";
import convertToHeroName from "../../helpers/convertToHeroName";
import heroesDota from "../../heroes.json";
import { useQuery } from "react-query";

function MatchInfo({ matchData }) {
  const [heroes, setHeroes] = useState([]);
  const { data, isLoading } = useQuery(
    ["nicknames", matchData],
    () => getPlayersNicknames(players),
    { enabled: true, refetchOnWindowFocus: false }
  );

  const {
    result: {
      dire_name,
      radiant_name,
      match_id,
      duration,
      dire_score,
      radiant_score,
      players,
    },
  } = matchData;

  useEffect(() => {
    const heroesIds = players.map((player) => player.hero_id);
    const heroNames = heroesIds.map((heroId) => {
      const hero = heroesDota.result.heroes.find((h) => h.id === heroId);
      return convertToHeroName(hero.name);
    });
    setHeroes(heroNames);
  }, [matchData]);

  return (
    <div className="matchinfo">
      {isLoading ? (
        <CircularProgress color="error" className="findmatch__loader" />
      ) : (
        <>
          <div className="matchinfo_details">
            <h1 className="matchinfo_title">
              {dire_name ? dire_name : `DIRE`} vs{" "}
              {radiant_name ? radiant_name : `RADIANT`}
            </h1>
            <div>ID: {match_id}</div>
            <div>Время: {transformTimeFormat(duration)}</div>
            <div>
              Счет: {dire_score}:{radiant_score}
            </div>
            <div>
              <div className="matchinfo_players">Игроки сил света:</div>

              {data.slice(0, 5).map((nickname, index) => (
                <div className="matchinfo_nicknames" key={nanoid()}>
                  {nickname} ({heroes[index]})
                </div>
              ))}
            </div>
            <div>
              <div className="matchinfo_players"> Игроки сил тьмы:</div>

              {data.slice(5).map((nickname, index) => (
                <div className="matchinfo_nicknames" key={nanoid()}>
                  {nickname} ({heroes[index + 5]})
                </div>
              ))}
            </div>
            <div className="matchinfo_moreID">
              You can find more actual match IDs{" "}
              <a
                href="https://uk.dotabuff.com/esports/matches"
                target="_blank"
                rel="noreferrer">
                here
              </a>
            </div>
          </div>
          <InteractiveMap matchData={matchData} />
        </>
      )}
    </div>
  );
}

export default MatchInfo;
