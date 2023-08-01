/* global BigInt */
const accountIDToSteamID = (accountID) => {
  const accountID64 = BigInt(accountID) + BigInt("76561197960265728");
  return String(accountID64);
};

export default accountIDToSteamID;
