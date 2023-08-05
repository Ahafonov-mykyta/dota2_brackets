import axios from "axios";

async function getDotaHeroes() {
  try {
    const response = await axios.get(
      `https://aqueous-headland-75357-75ce39fd598f.herokuapp.com/api/heroes`
    );
    return response.data.result.heroes;
  } catch (error) {
    console.error("ERROR:", error);
    return null;
  }
}

export default getDotaHeroes;
