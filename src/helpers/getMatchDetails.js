import axios from "axios";
const API_KEY = "BB630920AA0332B344251E1A3C1EB035";
async function getMatchDetails(matchId) {
  try {
    const response = await axios.get(
      `/IDOTA2Match_570/GetMatchDetails/v1?match_id=${matchId}&key=${API_KEY}`
    );
    const data = response.data;

    return data;
  } catch (error) {
    console.error("Error:", error.message);
    throw error;
  }
}

export default getMatchDetails;
