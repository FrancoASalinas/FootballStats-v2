import {
  NavLink,
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
  const { teamData, availableSeasons, transfers }: Data = useLoaderData() as any;
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
        <NavLink to={location.pathname.split('/').length === 5  ? '' : location.pathname.split('/').slice(0, 5).join('/')} end className={({isActive}) =>  `p-2 text-sm ${isActive ? 'bg-light text-black' : ''} hover:underline text-center w-full rounded-l-lg rounded-bl-lg h-full `} >Stats</NavLink>
        <NavLink to='players' className={({isActive}) =>`p-2 text-sm ${isActive ? 'bg-light text-black' : ''} hover:underline text-center w-full h-full `} >Players</NavLink>
        <NavLink to='transfers' className={({isActive}) => `p-2 text-sm ${isActive ? 'bg-light text-black' : ''} hover:underline text-center w-full rounded-r-lg rounded-br-lg h-full `} >Transfers</NavLink>

      </CustomNav>
      <Outlet context={{ teamData, transfers }} />
    </>
  );
}

export default TeamLayout;

export function useTeamData() {
  return useOutletContext<Data>();
}
