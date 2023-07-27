import {
  Link,
  Outlet,
  useLoaderData,
  useLocation,
  useNavigate,
  useOutletContext,
} from 'react-router-dom';
import LayoutHeader from '../modules/LayoutHeader';
import { Data } from '../utils/types';

function TeamLayout() {
  const { teamData, availableSeasons }: Data = useLoaderData() as any;

  const navigate = useNavigate();
  const location = useLocation();

  return (
    <>
      <LayoutHeader
        name={teamData.response.team.name}
        src={teamData.response.team.logo}
      />
      <label>
        Season{' '}
        <select
          className="m-2"
          defaultValue={teamData.parameters.season}
          onChange={(e) =>
            navigate(
              `/team/${teamData.parameters.league}/${availableSeasons.parameters.team}/${e.target.value}`
            )
          }
        >
          {availableSeasons.response.map((season) => (
            <option key={season}>{season}</option>
          ))}
        </select>
      </label>
      <label>
        Competition{' '}
        <select
          className="m-2"
          defaultValue={teamData.response.league.name}
        ></select>
      </label>
      <nav className="w-full h-10 my-5">
        <ul className="flex justify-between flex-wrap">
          <li className="p-2 hover:underline">
            <Link
              to={
                location.pathname.split('/').length > 5
                  ? location.pathname.split('/').slice(0, -1).join('/')
                  : ''
              }
            >
              Statistics
            </Link>
          </li>
          <li className="p-2 hover:underline">
            <Link to="players">Players</Link>
          </li>
          <li className="p-2 hover:underline">
            <Link to="transfers">Transfers</Link>
          </li>
        </ul>
      </nav>
      <Outlet context={{ teamData }} />
    </>
  );
}

export default TeamLayout;

export function useTeamData() {
  return useOutletContext<Data>();
}
