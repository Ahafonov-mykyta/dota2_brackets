function convertToHeroName(heroString) {
  const nameWithoutPrefix = heroString.replace("npc_dota_hero_", "");
  const words = nameWithoutPrefix.split("_");
  const formattedWords = words.map(
    (word) => word.charAt(0).toUpperCase() + word.slice(1)
  );
  const heroName = formattedWords.join(" ");
  return heroName;
}

export default convertToHeroName;
