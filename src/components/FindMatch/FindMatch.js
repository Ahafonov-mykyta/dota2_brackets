import { useEffect, useState } from "react";
import React from "react";
import "./FindMatch.css";
import MatchInfo from "../MatchInfo/MatchInfo";
import getMatchDetails from "../../helpers/getMatchDetails";
import sad from "../../images/sad.png";
import CircularProgress from "@mui/material/CircularProgress";

const MemoizedMatchInfo = React.memo(MatchInfo);

function FindMatch() {
  const [matchId, setMatchId] = useState("");
  const [matchData, setMatchData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getMatchDetails("7234263112")
      .then((data) => {
        setMatchData(data);
        setLoading(false);
      })
      .catch(() => setMatchData(null));
  }, []);

  const onChange = (e) => {
    setMatchId(e.target.value);
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    getMatchDetails(matchId)
      .then((data) => {
        if (data.result.error) {
          return setMatchData(null);
        }
        setMatchData(data);
        setMatchId("");
      })
      .catch(() => setMatchData(null));
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
        <button className="findmatch__button" type="submit">
          Get match data
        </button>
      </form>

      {loading ? (
        <CircularProgress color="error" className="findmatch__loader" />
      ) : !matchData ? (
        <div className="error_nodata">
          <img src={sad} alt="sad" className="error_nodata_image" />
          <div className="error_text">There is no match with that ID </div>
        </div>
      ) : (
        <MemoizedMatchInfo matchData={matchData} />
      )}
    </div>
  );
}

export default FindMatch;
