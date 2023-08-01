import axios from "axios";

async function getDotaHeroes() {
  try {
    const response = await axios.get(
      `https://aqueous-headland-75357-75ce39fd598f.herokuapp.com/api/heroes`
    );
    const heroesData = response.data.result.heroes;
    return heroesData;
  } catch (error) {
    console.error("Ошибка:", error);
    return null;
  }
}

export default getDotaHeroes;
