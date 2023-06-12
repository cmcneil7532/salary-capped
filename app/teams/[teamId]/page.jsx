import getAllPlayers from "../../api/getAllPlayers";
import getTeamPayrollNotes from "../../api/getTeamPayrollNotes";
import teams from "../../../public/teams";
import Link from "next/link";
import Player from "./[playerId]/page";

export default async function Page({ params }) {
  const data = await getAllPlayers();
  const marketSalary = "123,600,000";
  const teamId = params.teamId;
  const notes = await getTeamPayrollNotes(teamId);
  const roster = data.filter((team) => team.team === teamId);
  const teamObj = teams.find((obj) => obj.id === teamId);
  let currentYear = new Date().getFullYear();
  let nextYear = currentYear + 1;

  const currentSalary = roster.map((player) =>
    player.currentSalary.replace("$", "")
  );
  const salary = currentSalary.map((value) =>
    Number(value.replaceAll(",", ""))
  );
  let total = 0;
  salary.map((value) => {
    total = total + value;
  });

  return (
    <div className="h-screen bg-gradient-to-tl from-slate-100 to-slate-400">
      <Link href="/#teams">Go Back</Link>
      <img className="w-[20vw] ml-[40vw] pt-10" src={teamObj.image.src} />

      <h1
        className={
          Number(marketSalary.replaceAll(",", "")) < total
            ? "text-red-500"
            : "text-green-600"
        }
      >
        ${total}
      </h1>
      <h1>NBA Salary Cap: ${marketSalary}</h1>
      <div className="w-[80vw] ml-[10vw]">
        <div className="flex text-xl font-bold justify-evenly mt-3">
          <h1 className="w-[20vw]">Player</h1>
          <p className="w-[20vw]">{currentYear} Salary</p>
          <p>{nextYear} Salary</p>
          <p>Guaranteed</p>
        </div>
        <Player roster={roster} players={data} />
      </div>
    </div>
  );
}
