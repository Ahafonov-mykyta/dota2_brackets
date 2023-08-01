import axios from "axios";
const API_KEY = "BB630920AA0332B344251E1A3C1EB035";

async function getDotaHeroes() {
  try {
    const response = await axios.get(
      `https://api.steampowered.com/IEconDOTA2_570/GetHeroes/v0001/?key=${API_KEY}`
    );
    const heroesData = response.data.result.heroes;
    return heroesData;
  } catch (error) {
    console.error("Ошибка:", error);
    return null;
  }
}

export default getDotaHeroes;
