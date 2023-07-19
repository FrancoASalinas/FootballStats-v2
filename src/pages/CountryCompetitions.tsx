import { Link, useLoaderData } from 'react-router-dom';

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

  return (
    <>
      <h2 className="text-2xl py-2">
        {data.response[0].country.name + ' Leagues'}
      </h2>
      <ul className="sm:grid grid-cols-2 ">
        {data.response.length > 0 &&
          data.response.map((item) => (
            <li>
              <Link to={`../comps/${item.league.id}`}>{item.league.name}</Link>
            </li>
          ))}
      </ul>
    </>
  );
}

export default CountryCompetitions;
