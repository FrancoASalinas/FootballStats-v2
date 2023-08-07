import { Link, Outlet, useLoaderData } from 'react-router-dom';
import { useState, useEffect } from 'react';
import useFavoriteData, { dataIsFavorite } from '../utils/useFavoriteData';
import { useLocation } from 'react-router-dom';
import LayoutHeader from '../modules/LayoutHeader';

interface Data {
  response: [
    {
      country: { name: string; id: number };
      league: { id: number; name: string };
    }
  ];
}

function CountryCompetitions() {
  const data: Data = useLoaderData() as Data;
  const [favorite, setFavorite] = useState(
    dataIsFavorite(data.response[0].country.name + '_comps' + '_fav')
  );
  const location = useLocation();

  useEffect(() => {
    favorite
      ? useFavoriteData(
          data.response[0].country.name + '_comps' + '_fav',
          'add',
          JSON.stringify([data.response[0].country.name, location.pathname])
        )
      : useFavoriteData(
          data.response[0].country.name + '_comps' + '_fav',
          'remove'
        );
  });

  return (
    <>
      <LayoutHeader
        name={data.response[0].country.name + ' Leagues'}
        favorite
        isFavorite={favorite}
        onClick={() => setFavorite((prev) => !prev)}
      />
      <ul className="sm:grid grid-cols-2 ">
        {data.response.length > 0 &&
          data.response.map((item) => (
            <li key={item.league.id}>
              <Link to={`${item.league.id}`}>{item.league.name}</Link>
            </li>
          ))}
      </ul>
      <Outlet />
    </>
  );
}

export default CountryCompetitions;
