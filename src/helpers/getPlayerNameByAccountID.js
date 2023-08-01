import axios from "axios";

async function getPlayerNameByAccountID(accountID) {
  try {
    const response = await axios.get(
      `http://localhost:7777/api/nicknames/${accountID}`
    );
    console.log(response);
    return response;
  } catch (error) {
    console.error("Error:", error);
    return null;
  }
}

export default getPlayerNameByAccountID;
