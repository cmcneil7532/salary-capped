
export default function Page({ params }) {
    const teamId = params.teamId
    return(
        <div>
            <h1>Team: {teamId}</h1>
        </div>
    )
}