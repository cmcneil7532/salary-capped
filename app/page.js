import Link from "next/link";
import { JSDOM } from "jsdom";

export default async function Home() {
  const response = await fetch(
    "https://www.basketball-reference.com/contracts/players.html"
  );
  const html = await response.text();
  const dom = new JSDOM(html);
  const document = dom.window.document;

  const playerContracts =
    document.querySelector("#player-contracts").textContent;

  console.log("Player Contract--------------", playerContracts);

  return (
    <main className="min-h-full flex flex-col justify-center items-center mt-24">
      <h1 className="text-3xl">$alary Capped</h1>
      <p>Track your favorite teams budget</p>
      <Link href="#teams" className="border-2 border-rose-500 rounded-lg">
        Track your team
      </Link>
    </main>
  );
}
