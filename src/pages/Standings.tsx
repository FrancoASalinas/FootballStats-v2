import { Link } from 'react-router-dom';
import { Standing } from '../utils/types';
import { useCompetitionContext } from './Competition';


function Standings() {
  const { currentSeasonStandings, availableCompSeasons } = useCompetitionContext();

  return (
    currentSeasonStandings.response.length > 0 &&
    currentSeasonStandings.response[0].league.standings.map(
      (item: [Standing]) => (
        <table
          key={item[0].team.id + item[0].group}
          className="w-full text-center border mb-10 border-dark"
        >
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
              <tr key={standing.team.id}>
                <td className="border border-dark">{standing.rank}</td>
                <td className="border border-dark">
                  <Link
                    to={`/team/${availableCompSeasons.response[0].league.id}/${standing.team.id}/${currentSeasonStandings.parameters.season}`}
                    className="hover:underline"
                  >
                    {standing.team.name}
                  </Link>
                </td>
                <td className="border border-dark">{standing.all.played}</td>
                <td className="border border-dark">{standing.all.goals.for}</td>
                <td className="border border-dark">
                  {standing.all.goals.against}
                </td>
                <td className="border border-dark">{standing.goalsDiff}</td>
                <td className="border border-dark">{standing.points}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )
    )
  );
}

export default Standings;
