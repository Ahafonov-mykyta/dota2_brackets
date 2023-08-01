import axios from "axios";

async function getMatchDetails(matchId) {
  try {
    const response = await axios.get(
      `http://localhost:7777/api/details/${matchId}`
    );
    const data = response.data;

    return data;
  } catch (error) {
    console.error("Error:", error.message);
    throw error;
  }
}

export default getMatchDetails;
