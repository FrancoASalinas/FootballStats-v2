import { useLoaderData, useNavigate } from 'react-router-dom';

function Competition() {
  const { availableSeasons, currentSeasonStandings }: any = useLoaderData();
  const navigate = useNavigate();

  console.log(currentSeasonStandings);

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
          className="my-5"
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
        {currentSeasonStandings.response.length > 0 &&
          currentSeasonStandings.response[0].league.standings.map(
            (
              item: [
                {
                  group: string;
                  rank: number;
                  team: { name: string };
                  all: {
                    played: number;
                    goals: { for: number; against: number };
                  };
                  goalsDiff: number;
                  points: number;
                }
              ]
            ) => (
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
                  {item.map(
                    (standing: {
                      rank: number;
                      team: { name: string };
                      all: {
                        played: number;
                        goals: { for: number; against: number };
                      };
                      goalsDiff: number;
                      points: number;
                    }) => (
                      <tr>
                        <td className="border border-dark">{standing.rank}</td>
                        <td className="border border-dark">
                          {standing.team.name}
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
                        <td className="border border-dark">
                          {standing.points}
                        </td>
                      </tr>
                    )
                  )}
                </tbody>
              </table>
            )
          )}
      </article>
    </div>
  );
}

export default Competition;
