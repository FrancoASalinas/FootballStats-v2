import { Link, useLoaderData, useNavigate } from 'react-router-dom';
import { Data } from '../utils/types';

function LiveFixtures() {
  const { liveFixtures } = useLoaderData() as Data;
  const navigate = useNavigate();

  console.log(liveFixtures);

  return (
    <>
      <h2 className="text-2xl my-3">Live Fixtures</h2>
      <ul className="divide-y divide-dark">
        {liveFixtures.response.map((fixture) => (
          <li className="py-3 flex justify-between items-center flex-wrap">
            <span className="flex gap-3 items-center">
              <img className="w-8 " src={fixture.teams.home.logo}></img>
              <Link
                to={`/team/${fixture.league.id}/${fixture.teams.home.id}/${fixture.league.season}`}
              >
                {fixture.teams.home.name}
              </Link>
              {fixture.goals.home} - {fixture.goals.away}{' '}
              <Link
                to={`/team/${fixture.league.id}/${fixture.teams.away.id}/${fixture.league.season}`}
              >
                {fixture.teams.away.name}
              </Link>{' '}
              <img className="w-8 " src={fixture.teams.away.logo}></img>
            </span>
            {fixture.fixture.status.short}
            <button onClick={() => navigate(`${fixture.fixture.id}`)}>
              More Stats
            </button>
          </li>
        ))}
      </ul>
    </>
  );
}

export default LiveFixtures;
