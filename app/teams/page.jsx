
import teams from '../../public/teams';
import Link from 'next/link';

const Teams = () => {
    return (
        <div className="grid grid-cols-5 w-screen ">
        {teams.map((team) => {
            return (
                <div key={team.id} className="">
                    <Link href={`teams/${team.id}`}>
                        <img className="h-20 "src={team.image.src} alt={team.name} />
                    </Link>
                </div>
            )
        })}
        </div>

    );
}

export default Teams