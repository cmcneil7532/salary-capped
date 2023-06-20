import teams from '../../public/teams';

const Teams = () => {
    return (
        <div className="grid grid-cols-5 h-screen gap-1" id="teams">
        {teams.map((team) => {
            return (
                <div key={team.id} className="flex justify-center self-center">
                    <a className="hover:translate-y-1 p-3" href={`teams/${team.id}`}>
                        <img className="w-20"src={team.image.src} alt={team.name} />
                        <p className="text-center text-white mt-2">{team.id}</p>
                    </a>
                </div>
            )
        })}
        </div>

    );
}

export default Teams