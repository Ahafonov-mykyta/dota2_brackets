/* global BigInt */
import { useState, useEffect } from "react";
import { nanoid } from "nanoid";
import "./MatchInfo.css";
import InteractiveMap from "../InteractiveMap/InteractiveMap";
import CircularProgress from "@mui/material/CircularProgress";
import getPlayerNameByAccountID from "../../helpers/getPlayerNameByAccountID";
import getDotaHeroes from "../../helpers/getHeroName";

function MatchInfo({ matchData }) {
  const [nicknames, setNicknames] = useState([]);
  const [heroes, setHeroes] = useState([]);
  const [loading, setLoading] = useState(true);

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
    const playersSteamIds = players.map((player) =>
      accountIDToSteamID(player.account_id)
    );

    Promise.all([
      getPlayerNameByAccountID(playersSteamIds),
      getDotaHeroes(),
    ]).then(([nicknamesData, heroesData]) => {
      setNicknames(nicknamesData.map((player) => player.personaname));

      const heroesIds = players.map((player) => player.hero_id);
      const heroNames = heroesIds.map((heroId) => {
        const hero = heroesData.find((h) => h.id === heroId);
        return convertToHeroName(hero.name);
      });
      setHeroes(heroNames);
      setLoading(false);
    });
  }, [matchData]);

  function convertToHeroName(heroString) {
    const nameWithoutPrefix = heroString.replace("npc_dota_hero_", "");
    const words = nameWithoutPrefix.split("_");
    const formattedWords = words.map(
      (word) => word.charAt(0).toUpperCase() + word.slice(1)
    );
    const heroName = formattedWords.join(" ");
    return heroName;
  }

  const accountIDToSteamID = (accountID) => {
    const accountID64 = BigInt(accountID) + BigInt("76561197960265728");
    return String(accountID64);
  };

  const secondsToMinutesSeconds = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    const formattedTime = `${String(minutes).padStart(2, "0")}:${String(
      remainingSeconds
    ).padStart(2, "0")}`;
    return formattedTime;
  };

  return (
    <div className="matchinfo">
      {loading ? (
        <CircularProgress color="error" className="findmatch__loader" />
      ) : (
        <>
          <div className="matchinfo_details">
            <h1 className="matchinfo_title">
              {dire_name ? dire_name : `DIRE`} vs{" "}
              {radiant_name ? radiant_name : `RADIANT`}
            </h1>
            <div>ID: {match_id}</div>
            <div>Время: {secondsToMinutesSeconds(duration)}</div>
            <div>
              Счет: {dire_score}:{radiant_score}
            </div>
            <div>
              Игроки сил света:
              {nicknames.slice(0, 5).map((nickname, index) => (
                <span className="matchinfo_nicknames" key={nanoid()}>
                  {nickname} ({heroes[index]})
                </span>
              ))}
            </div>
            <div>
              Игроки сил тьмы:
              {nicknames.slice(5).map((nickname, index) => (
                <span className="matchinfo_nicknames" key={nanoid()}>
                  {nickname} ({heroes[index + 5]})
                </span>
              ))}
            </div>
          </div>
          <InteractiveMap matchData={matchData} />
        </>
      )}
    </div>
  );
}

export default MatchInfo;
