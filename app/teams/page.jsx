import teams from "../../public/teams";

const Teams = () => {
  return (
    <div className="grid grid-cols-5 gap-1 max-sm:grid-cols-3" id="teams">
      {teams.map((team) => {
        return (
          <div key={team.id} className="flex justify-center self-center hover:scale-125 transition duration-300">
            <a className="p-3 pb-10" href={`teams/${team.id}`}>
              <img className="w-20" src={team.image.src} alt={team.name} />
            </a>
          </div>
        );
      })}
    </div>
  );
};

export default Teams;
