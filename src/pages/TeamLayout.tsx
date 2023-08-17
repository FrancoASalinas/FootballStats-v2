import {
  Link,
  Outlet,
  useLoaderData,
  useLocation,
  useNavigate,
  useNavigation,
  useOutletContext,
} from 'react-router-dom';
import LayoutHeader from '../modules/LayoutHeader';
import { Data } from '../utils/types';
import { useState, useEffect } from 'react';
import useFavoriteData, { dataIsFavorite } from '../utils/useFavoriteData';
import useRecentlyVisited from '../utils/useRecentlyVisited';
import CustomSelect from '../modules/CustomSelect';
import CustomNav from '../modules/CustomNav';
import Spinner from '../modules/Spinner';

function TeamLayout() {
  const { teamData, availableSeasons }: Data = useLoaderData() as any;
  const [favorite, setFavorite] = useState(
    dataIsFavorite(
      `${teamData.response.team.name}_${teamData.parameters.league}_${teamData.parameters.season}_fav`
    )
  );
  const [recents, setRecents] = useRecentlyVisited();
  const navigate = useNavigate();
  const navigation = useNavigation();
  const location = useLocation();

  useEffect(() => {
    const title =
      teamData.response.team.name +
      ' > ' +
      teamData.response.league.name +
      ' > ' +
      teamData.parameters.season;

    favorite
      ? useFavoriteData(
          `${teamData.response.team.name}_${teamData.parameters.league}_${teamData.parameters.season}_fav`,
          'add',
          JSON.stringify([title, location.pathname])
        )
      : useFavoriteData(
          `${teamData.response.team.name}_${teamData.parameters.league}_${teamData.parameters.season}_fav`,
          'remove'
        );
    setRecents([[title, location.pathname], ...recents]);
  }, []);

  return navigation.state === 'loading' ? (
    <Spinner />
  ) : (
    <>
      <LayoutHeader
        name={teamData.response.team.name}
        src={teamData.response.team.logo}
        favorite
        isFavorite={favorite}
        onClick={() => setFavorite((prev) => !prev)}
      />
      <label>
        Season{' '}
        <CustomSelect
          defaultValue={teamData.parameters.season}
          onChange={(e: any) =>
            navigate(
              `/team/${teamData.parameters.league}/${availableSeasons.parameters.team}/${e.target.value}`
            )
          }
        >
          {availableSeasons.response.map((season) => (
            <option key={season}>{season}</option>
          ))}
        </CustomSelect>
      </label>
      <CustomNav>
        <li
          className={`p-2 hover:underline text-center w-full rounded-l-lg rounded-bl-lg ${
            location.pathname.split('/').length === 5 && 'bg-light text-black'
          }`}
        >
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
        <li
          className={`p-2 hover:underline text-center w-full ${
            location.pathname.split('/').includes('players') &&
            'bg-light text-black'
          }`}
        >
          <Link to="players">Players</Link>
        </li>
        <li
          className={`p-2 hover:underline text-center w-full rounded-r-lg rounded-br-lg ${
            location.pathname.split('/').includes('transfers') &&
            'bg-light text-black'
          }`}
        >
          <Link to="transfers">Transfers</Link>
        </li>
      </CustomNav>
      <Outlet context={{ teamData }} />
    </>
  );
}

export default TeamLayout;

export function useTeamData() {
  return useOutletContext<Data>();
}
