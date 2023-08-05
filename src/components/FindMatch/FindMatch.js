import { useState } from "react";
import React from "react";
import "./FindMatch.css";
import MatchInfo from "../MatchInfo/MatchInfo";
import getMatchDetails from "../../helpers/getMatchDetails";
import sad from "../../images/sad.png";
import CircularProgress from "@mui/material/CircularProgress";
import { useQuery } from "react-query";

const MemoizedMatchInfo = React.memo(MatchInfo);

function FindMatch() {
  const [matchId, setMatchId] = useState("7234263112");
  const { data, isLoading, isError, refetch } = useQuery(
    "matchData",
    () => getMatchDetails(matchId),

    { enabled: true, refetchOnWindowFocus: false }
  );

  const onChange = (e) => {
    setMatchId(e.target.value);
  };

  const onSubmit = (e) => {
    e.preventDefault();
    refetch();
    setMatchId("");
  };

  return (
    <div className="findmatch">
      <form className="findmatch_form" onSubmit={onSubmit}>
        <input
          value={matchId}
          className="findmatch__input"
          type="number"
          onChange={onChange}
          placeholder="Enter ID match here...."
        />
        <button
          className="findmatch__button"
          type="submit"
          disabled={matchId ? false : true}>
          Get match data
        </button>
      </form>

      {isLoading ? (
        <CircularProgress color="error" className="findmatch__loader" />
      ) : !data || data.result.error || isError ? (
        <div className="error_nodata">
          <img src={sad} alt="sad" className="error_nodata_image" />
          <div className="error_text">
            There is no match with that ID <br />
            You can find some actual IDs{" "}
            <a
              href="https://uk.dotabuff.com/esports/matches"
              target="_blank"
              rel="noreferrer">
              here
            </a>
          </div>
        </div>
      ) : (
        <MemoizedMatchInfo matchData={data} />
      )}
    </div>
  );
}

export default FindMatch;
