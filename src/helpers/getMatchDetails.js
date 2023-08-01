import axios from "axios";
const API_KEY = "8B7CCB94980C8EFBEEB368257D26F99F";
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
