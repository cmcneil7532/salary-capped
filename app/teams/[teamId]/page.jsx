import getAllPlayers from "../../api/getAllPlayers";

export default async function Page({ params }) {
  const data = await getAllPlayers();
  const marketSalary = "123,600,000";

  const teamId = params.teamId;

  const roster = data.filter((team) => team.team === teamId);

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
  console.log(total);

  return (
    <div>
      <h1>Team: {teamId}</h1>
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
