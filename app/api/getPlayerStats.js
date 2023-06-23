import * as cheerio from "cheerio";

const getPlayerStats = async (playerSelected) => {
  const decodedName = decodeURI(playerSelected.name);
  const americanName = decodedName
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");

  try {
    //gets last initial from name string for letter directory
    const lastInitial =
      americanName[americanName.indexOf(" ") + 1].toLowerCase();

    //gets last name & first 2 letters of first name for name directory
    const firstSpaceIdx = americanName.search(" ");
    const separatedNameArr = americanName.split(americanName[firstSpaceIdx]);
    const twoCharsOfFirstName = separatedNameArr[0].replace(/[^a-z0-9]/gi, "");
    const fiveCharsOfLastName = separatedNameArr[1]
      .replace(/[^a-z0-9]/gi, "")
      .slice(0, 5);
    let namePath = (
      fiveCharsOfLastName + twoCharsOfFirstName.substring(0, 2)
    ).toLowerCase();
    console.log(namePath);
    if(namePath === "osmance") {
      namePath = "osmande"
    }
    if(namePath === "capelcl") {
      namePath = "capelca"
    }
    if(namePath === "klebema") {
      namePath = "klebima"
    }
    if(namePath === "ntilifr") {
      namePath = "ntilila"
    }
    let count = 1;
    //web scrape for player stats
    let match = false;

    while (!match) {
      try {
        let response = await fetch(
          `https://www.basketball-reference.com/players/${lastInitial}/${namePath}0${count}.html`
        );
        const html = await response.text();
        const $ = cheerio.load(html);
        const playerName = $("#meta div h1 span").text();
        if (playerName === decodedName) {
          console.log('hitting true');
          match = true;
          const imgData = $("#info");
          const playerImage = $(imgData).find(".media-item img").attr("src");

          //iterate table columns
          const playerStats = [];
          $(".stats_pullout div div").each((i, el) => {
            const colHead = $(el).find("span").text();
            let p = $(el).find("p");
            const currentYearStat = $(el).find(p[0]).text();
            const careerStat = $(el).find(p[1]).text();
            playerStats.push({
              colHead,
              currentYearStat,
              careerStat,
            });
          });
          const shorterStats = playerStats.slice(0, 8);
          const playerBio = { image: playerImage, table: shorterStats };
          return playerBio;
        } else {
          if(count === 7) { break };
          console.log('hitting false');
          count++;
        }
      } catch (error) {
        console.error;
      }
    }
  } catch (error) {
    console.log(error);
  }
};

export default getPlayerStats;
