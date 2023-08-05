import axios from "axios";

async function getMatchDetails(matchId) {
  const response = await axios.get(
    `https://aqueous-headland-75357-75ce39fd598f.herokuapp.com/api/details/${matchId}`
  );
  return response.data;
}

export default getMatchDetails;
