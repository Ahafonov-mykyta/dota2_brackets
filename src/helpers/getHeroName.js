import axios from "axios";

async function getDotaHeroes() {
  try {
    const response = await axios.get(`http://localhost:7777/api/heroes`);
    const heroesData = response.data.result.heroes;
    return heroesData;
  } catch (error) {
    console.error("Ошибка:", error);
    return null;
  }
}

export default getDotaHeroes;
