import * as cheerio from "cheerio";

const getAllPlayers = async () => {
  const response = await fetch(
    "https://www.basketball-reference.com/contracts/players.html"
  );
  const html = await response.text();
  const $ = cheerio.load(html);
  const allRows = $("#player-contracts > tbody > tr");
  const playerData = [];
  const seen = new Set();
  allRows.each((index, element) => {
    const tds = $(element).find("td");
    const name = $(tds[0]).text();
    const team = $(tds[1]).text();
    const currentSalary = $(tds[2]).text();
    const nextYearSalary = $(tds[3]).text();
    const guranteed = $(tds[8]).text();
    playerData.push({
      name: name,
      team: team,
      currentSalary: currentSalary,
      "Next years": nextYearSalary,
      guranteed: guranteed,
    });
  });
  const filteredPlayers = playerData.filter(player => {
    const dup = seen.has(player.name);
    seen.add(player.name)
    return !dup
  });
  return filteredPlayers
};

export default getAllPlayers;
