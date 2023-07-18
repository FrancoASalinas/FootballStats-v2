import { useLoaderData, useNavigate } from 'react-router-dom';

function Competition() {
  const { availableSeasons, currentSeasonStandings }: any = useLoaderData();
  const navigate = useNavigate();

  console.log(currentSeasonStandings.response[0]);

  return (
    <div>
      <div className="flex justify-between">
        <h1 className="text-3xl ">
          {availableSeasons.response[0].league.name}
        </h1>
        <img
          className="w-20"
          src={availableSeasons.response[0].league.logo}
        ></img>
      </div>
      <nav>
        <ul></ul>
      </nav>
      <label>
        Season{' '}
        <select
          defaultValue={currentSeasonStandings.parameters.season}
          onChange={(e) =>
            navigate(
              `/competitions/comps/${availableSeasons.response[0].league.id}/${e.target.value}`
            )
          }
        >
          {availableSeasons.response[0].seasons.map((season: any) => (
            <option key={season.year}>{season.year}</option>
          ))}
        </select>
      </label>
      <article>
        <ul>
          {currentSeasonStandings.response.length > 0 &&
            currentSeasonStandings.response[0].league.standings[0].map(
              (position: {
                rank: number;
                team: { name: string; id: number };
                points: number;
              }) => (
                <li key={position.team.id}>
                  {position.rank} {position.team.name} {position.points}
                </li>
              )
            )}
        </ul>
      </article>
    </div>
  );
}

export default Competition;
