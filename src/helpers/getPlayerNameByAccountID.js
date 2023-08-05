import axios from "axios";
import accountIDToSteamID from "./accountIDToSteamID";

export async function getPlayerNameByAccountID(accountID) {
  const response = await axios.get(
    `https://aqueous-headland-75357-75ce39fd598f.herokuapp.com/api/nicknames/${accountID}`
  );

  return response;
}

export const getPlayersNicknames = async (players) => {
  const playersSteamIds = players.map((player) =>
    accountIDToSteamID(player.account_id)
  );
  const names = await getPlayerNameByAccountID(playersSteamIds);
  return names.data.map((player) => player.personaname);
};
