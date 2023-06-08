import getAllPlayers from "../../api/getAllPlayers";

export default async function Page({ params }) {
  const data = await getAllPlayers();
  const teamId = params.teamId;

  const roster = data.filter((team) => team.team === teamId);

  return (
    <div>
      <h1>Team: {teamId}</h1>
      {roster.map((player) => {
        return (
          <>
            <h1>Player</h1>
            <p>{player.name}</p>
            <p>Salary: {player.currentSalary}</p>
            <p>
              Next Year Salary:
              {player["Next years"]
                ? player["Next years"]
                : " No contract for next year"}
            </p>
            <p>Guranteed: {player.guranteed}</p>
          </>
        );
      })}
    </div>
  );
}
