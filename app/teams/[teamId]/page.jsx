
import getAllPlayers from "../../api/getAllPlayers";
import getTeamPayrollNotes from "../../api/getTeamPayrollNotes";
import teams from "../../../public/teams";

export default async function Page({ params }) {
  const data = await getAllPlayers();
  const teamId = params.teamId;
  const notes = await getTeamPayrollNotes(teamId);
  const roster = data.filter((team) => team.team === teamId);
  const teamObj = teams.find(obj => obj.id === teamId);
  let currentYear = new Date().getFullYear();
  let nextYear = currentYear + 1
  return (
    <div className="h-screen bg-gradient-to-tl from-slate-100 to-slate-400">
    <img className="w-[20vw] ml-[40vw] pt-10" src={teamObj.image.src} />
      <div className="w-[80vw] ml-[10vw]">
      <div className="flex text-xl font-bold justify-evenly mt-3">
            <h1 className="w-[20vw]">Player</h1>
            <p className="w-[20vw]">{currentYear} Salary</p>
            <p>{nextYear} Salary</p>
            <p>Guaranteed</p>
        </div>
      {roster.map((player) => {
        return (
          <div className=" flex justify-evenly bg-gradient-to-tl from-slate-200 to-white hover:-translate-y-1">
            <h3 className="text-xl w-[20vw]">{player.name}</h3>
            <p className="w-[20vw]">{player.currentSalary}</p>
            <p>
              {player["Next years"]
                ? player["Next years"]
                : "Contract End"}
            </p>
            <p>{player.guranteed}</p>
          </div>
        );
      })}
      </div>
    </div>
  );
}
