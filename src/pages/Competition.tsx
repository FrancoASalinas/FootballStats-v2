import { Link, useLoaderData, useNavigate } from 'react-router-dom';
import LayoutHeader from '../modules/LayoutHeader';

interface Data {
  availableSeasons: {
    response: [
      {
        league: { name: string; logo: string; id: number };
        seasons: [];
      }
    ];
  };
  currentSeasonStandings: {
    parameters: { season: number };
    response: [{ league: { standings: [] } }];
  };
}

interface Standing {
  group: string;
  rank: number;
  team: {
    id: number;
    name: string;
  };
  all: {
    played: number;
    goals: { for: number; against: number };
  };
  goalsDiff: number;
  points: number;
}

function Competition() {
  const { availableSeasons, currentSeasonStandings }: Data =
    useLoaderData() as Data;
  const navigate = useNavigate();

  return (
    <>
      <LayoutHeader
        name={availableSeasons.response[0].league.name}
        src={availableSeasons.response[0].league.logo}
      />
      <nav>
        <ul></ul>
      </nav>
      <label>
        Season{' '}
        <select
          className="my-5"
          defaultValue={currentSeasonStandings.parameters.season}
          onChange={(e) =>
            navigate(
              `/competitions/comps/${availableSeasons.response[0].league.id}/${e.target.value}`
            )
          }
        >
          {availableSeasons.response[0].seasons.map(
            (season: { year: number }) => (
              <option key={season.year}>{season.year}</option>
            )
          )}
        </select>
      </label>
      <article>
        {currentSeasonStandings.response.length > 0 &&
          currentSeasonStandings.response[0].league.standings.map(
            (item: [Standing]) => (
              <table className="w-full text-center border mb-10 border-dark">
                <caption>{item[0].group}</caption>
                <thead className="overflow-x-scroll">
                  <tr>
                    <th className="border border-dark">Rank</th>
                    <th className="border border-dark">Team</th>
                    <th className="border border-dark">P</th>
                    <th className="border border-dark">GF</th>
                    <th className="border border-dark">GA</th>
                    <th className="border border-dark">GD</th>
                    <th className="border border-dark">Points</th>
                  </tr>
                </thead>
                <tbody className="overflow-x-scroll">
                  {item.map((standing: Standing) => (
                    <tr>
                      <td className="border border-dark">{standing.rank}</td>
                      <td className="border border-dark">
                        <Link
                          to={`/team/${availableSeasons.response[0].league.id}/${standing.team.id}/${currentSeasonStandings.parameters.season}`}
                          className="hover:underline"
                        >
                          {standing.team.name}
                        </Link>
                      </td>
                      <td className="border border-dark">
                        {standing.all.played}
                      </td>
                      <td className="border border-dark">
                        {standing.all.goals.for}
                      </td>
                      <td className="border border-dark">
                        {standing.all.goals.against}
                      </td>
                      <td className="border border-dark">
                        {standing.goalsDiff}
                      </td>
                      <td className="border border-dark">{standing.points}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )
          )}
      </article>
    </>
  );
}

export default Competition;
