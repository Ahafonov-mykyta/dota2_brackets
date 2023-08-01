import axios from "axios";
const API_KEY = "8B7CCB94980C8EFBEEB368257D26F99F";

async function getPlayerNameByAccountID(accountID) {
  try {
    const response = await axios.get(
      `/ISteamUser/GetPlayerSummaries/v0002/?key=${API_KEY}&steamids=${accountID}`
    );
    const data = response.data.response.players;

    //если отправлять в запросе массив стимайди, то возвращает их стим в другом порядке. поэтому
    //делаем такой же как и отправляли
    const accountIDMap = new Map();
    accountID.forEach((id, index) => accountIDMap.set(id, index));
    data.sort((a, b) => {
      const indexA = accountIDMap.get(a.steamid);
      const indexB = accountIDMap.get(b.steamid);
      return indexA - indexB;
    });

    return data;
  } catch (error) {
    console.error("Error:", error);
    return null;
  }
}

export default getPlayerNameByAccountID;
