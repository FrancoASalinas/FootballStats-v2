import {
  Link,
  useLoaderData,
  useLocation,
  useNavigate,
} from 'react-router-dom';
import LayoutHeader from '../modules/LayoutHeader';
import { useEffect, useState } from 'react';
import useFavoriteData, { dataIsFavorite } from '../utils/useFavoriteData';
import useRecentlyVisited from '../utils/useRecentlyVisited';
import CustomSelect from '../modules/CustomSelect';

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
  const [favorite, setFavorite] = useState(
    dataIsFavorite(
      'seasonStandings_' +
        availableSeasons.response[0].league.id +
        currentSeasonStandings.parameters.season +
        '_fav'
    )
  );
  const [recents, setRecents] = useRecentlyVisited();
  const location = useLocation();

  useEffect(() => {
    favorite
      ? useFavoriteData(
          'seasonStandings_' +
            availableSeasons.response[0].league.id +
            currentSeasonStandings.parameters.season +
            '_fav',
          'add',
          JSON.stringify([
            availableSeasons.response[0].league.name,
            location.pathname,
          ])
        )
      : useFavoriteData(
          'seasonStandings_' +
            availableSeasons.response[0].league.id +
            currentSeasonStandings.parameters.season +
            '_fav',
          'remove'
        );

    setRecents([
      ...recents,
      [availableSeasons.response[0].league.name, location.pathname],
    ]);
  }, []);

  return (
    <div className="my-10">
      <LayoutHeader
        name={availableSeasons.response[0].league.name}
        src={availableSeasons.response[0].league.logo}
        favorite
        isFavorite={favorite}
        onClick={() => setFavorite((prev) => !prev)}
      />
      <nav>
        <ul></ul>
      </nav>
      <label>
        Season{' '}
        <CustomSelect
          defaultValue={currentSeasonStandings.parameters.season}
          onChange={(e: any) => navigate(`${e.target.value}`)}
        >
          {availableSeasons.response[0].seasons.map(
            (season: { year: number }) => (
              <option key={season.year}>{season.year}</option>
            )
          )}
        </CustomSelect>
      </label>
      <article>
        {currentSeasonStandings.response.length > 0 &&
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
    </div>
  );
}

export default Competition;
