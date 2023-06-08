import Link from "next/link";
import * as cheerio from "cheerio";

export default async function Home() {
  const response = await fetch(
    "https://www.basketball-reference.com/contracts/players.html"
  );
  const html = await response.text();
  const $ = cheerio.load(html);
  const allRows = $("#player-contracts > tbody > tr");
  const playerData = [];
  allRows.each((index, element) => {
    const tds = $(element).find("td");
    const name = $(tds[0]).text();
    const team = $(tds[1]).text();
    const currentSalary = $(tds[2]).text();
    const nextYearSalary = $(tds[3]).text();
    const guranteed = $(tds[8]).text();
    playerData.push({
      Name: name,
      Team: team,
      currentSalary: currentSalary,
      "Next years": nextYearSalary,
      Guranteed: guranteed,
    });
  });
  console.log(playerData);

  return (
    <main className="min-h-full flex flex-col justify-center items-center mt-24">
      <h1 className="text-3xl">$alary Capped</h1>

      <p>Pick a Team. Track player salaries.</p>
      <Link href="/teams" className="border-2 border-rose-500 rounded-lg">
        Get Started


      </Link>
    </main>
  );
}
