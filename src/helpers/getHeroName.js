import axios from "axios";
const API_KEY = "8B7CCB94980C8EFBEEB368257D26F99F";

async function getDotaHeroes() {
  try {
    const response = await axios.get(
      `/IEconDOTA2_570/GetHeroes/v0001/?key=${API_KEY}`
    );
    const heroesData = response.data.result.heroes;
    return heroesData;
  } catch (error) {
    console.error("Ошибка:", error);
    return null;
  }
}

export default getDotaHeroes;
