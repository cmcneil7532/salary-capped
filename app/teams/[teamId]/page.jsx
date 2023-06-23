import getAllPlayers from "../../api/getAllPlayers";
import getTeamPayrollNotes from "../../api/getTeamPayrollNotes";
import teams from "../../../public/teams";
import Link from "next/link";
import Player from "./[playerId]/page";

export default async function Page({ params }) {
  const data = await getAllPlayers();
  const marketSalary = "123,600,000";
  const teamId = params.teamId;
  // const notes = await getTeamPayrollNotes(teamId);
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
    <div className="min-h-screen bg-gradient-to-tl from-slate-300 to-slate-500">
      <Link className=" font-semibold text-sm m-10 mt-2 rounded-lg p-2 border-2 border-gray-200 text-gray-200 hover:bg-orange-600 hover:text-black duration-300" href="/#teams">Back to Teams</Link>
      <div className="text-lg flex items-center justify-center">
        <img className="w-[125px] pt-10" src={teamObj.image.src} />
        <div className="m-5 mt-10 font-medium">
        <h1 className="font-extrabold text-2xl">{teamObj.name}</h1>
        <p>{currentYear} Payroll:</p>
        <p
          className={
            Number(marketSalary.replaceAll(",", "")) < total
              ? "text-red-500"
              : "text-green-600"
          }
        >{total.toLocaleString("en-US", {
                    style: "currency",
                    currency: "USD",
                  })}
        </p>
        <p>NBA Salary Cap: ${marketSalary}</p>
        </div>
      </div>
      <div className="min-w-screen mt-6 m-4 max-sm:m-0">
        <ul className="flex justify-around align-center text-base font-semibold">
          <li className="w-[25vw]">Player</li>
          <li className="w-[25vw]">{currentYear}</li>
          <li className="w-[25vw]">{nextYear}</li>
          <li className="w-25vw">Contract</li>
        </ul>
        <Player roster={roster} players={data} />
      </div>
      <footer className="text-center text-xs text-slate-400 bottom-0">Developed By: <a target="_blank" href="https://www.linkedin.com/in/grant-gilman-83a396112/">Grant Gilman</a> & <a href="https://www.linkedin.com/in/christian-mcneil/" target="_blank">Christian McNeil</a> | 2023 All Rights Reserved</footer>
    </div>
  );
}
