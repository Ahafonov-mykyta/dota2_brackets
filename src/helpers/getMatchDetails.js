import axios from "axios";

async function getMatchDetails(matchId) {
  try {
    const response = await axios.get(
      `https://aqueous-headland-75357-75ce39fd598f.herokuapp.com/api/details/${matchId}`
    );
    const data = response.data;

    return data;
  } catch (error) {
    console.error("Error:", error.message);
    throw error;
  }
}

export default getMatchDetails;
