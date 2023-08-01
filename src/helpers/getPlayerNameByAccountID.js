import axios from "axios";

async function getPlayerNameByAccountID(accountID) {
  try {
    const response = await axios.get(
      `https://aqueous-headland-75357-75ce39fd598f.herokuapp.com/api/nicknames/${accountID}`
    );
    console.log(response);
    return response;
  } catch (error) {
    console.error("Error:", error);
    return null;
  }
}

export default getPlayerNameByAccountID;
