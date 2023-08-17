import {
  NavLink,
  Outlet,
  useLoaderData,
  useLocation,
  useNavigate,
  useOutletContext,
} from 'react-router-dom';
import LayoutHeader from '../modules/LayoutHeader';
import { useEffect, useState } from 'react';
import useFavoriteData, { dataIsFavorite } from '../utils/useFavoriteData';
import useRecentlyVisited from '../utils/useRecentlyVisited';
import CustomSelect from '../modules/CustomSelect';
import CustomNav from '../modules/CustomNav';
import { Data } from '../utils/types';


function Competition() {
  const location = useLocation();
  const { availableCompSeasons, currentSeasonStandings, topScorers, topAssists }: Data =
    useLoaderData() as Data;
  const navigate = useNavigate();
  const [favorite, setFavorite] = useState(
    dataIsFavorite(
      'seasonStandings_' +
        availableCompSeasons.response[0].league.id +
        currentSeasonStandings.parameters.season +
        '_fav'
    )
  );
  const [recents, setRecents] = useRecentlyVisited();

  useEffect(() => {
    favorite
      ? useFavoriteData(
          'seasonStandings_' +
            availableCompSeasons.response[0].league.id +
            currentSeasonStandings.parameters.season +
            '_fav',
          'add',
          JSON.stringify([
            availableCompSeasons.response[0].league.name,
            location.pathname,
          ])
        )
      : useFavoriteData(
          'seasonStandings_' +
            availableCompSeasons.response[0].league.id +
            currentSeasonStandings.parameters.season +
            '_fav',
          'remove'
        );

    setRecents([
      [availableCompSeasons.response[0].league.name, location.pathname],
      ...recents,
    ]);
  }, []);

  return (
    <div className="my-10">
      <LayoutHeader
        name={availableCompSeasons.response[0].league.name}
        src={availableCompSeasons.response[0].league.logo}
        favorite
        isFavorite={favorite}
        onClick={() => setFavorite((prev) => !prev)}
      />
      <CustomNav>
          <NavLink to={location.pathname.split('/').length === 5  ? '' : location.pathname.split('/').slice(0, 5).join('/')} end className={({isActive}) =>  `p-2 text-sm ${isActive ? 'bg-light text-black' : ''} hover:underline text-center w-full rounded-l-lg rounded-bl-lg h-full `} >Standings</NavLink>
          <NavLink to='topscorers' className={({isActive}) =>`p-2 text-sm ${isActive ? 'bg-light text-black' : ''} hover:underline text-center w-full h-full `} >Top Scorers</NavLink>
          <NavLink to='topassists' className={({isActive}) => `p-2 text-sm ${isActive ? 'bg-light text-black' : ''} hover:underline text-center w-full rounded-r-lg rounded-br-lg h-full `} >Top Assists</NavLink>
      </CustomNav>
      <label>
        Season{' '}
        <CustomSelect
          defaultValue={currentSeasonStandings.parameters.season}
          onChange={(e: any) => navigate(`${e.target.value}`)}
        >
          {availableCompSeasons.response[0].seasons.map(
            (season: { year: number }) => (
              <option key={season.year}>{season.year}</option>
            )
          )}
        </CustomSelect>
      </label>
      <article>
        <Outlet context={{ currentSeasonStandings, availableCompSeasons, topScorers, topAssists }} />
      </article>
    </div>
  );
}

export function useCompetitionContext() {
  return useOutletContext<Data>();
}

export default Competition;
