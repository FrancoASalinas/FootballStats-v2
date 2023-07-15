import { Link, useLoaderData } from 'react-router-dom';

function CountryCompetitions() {
  const data: any = useLoaderData();

  console.log(data.response);

  return (
    <>
      <h2 className="text-2xl py-2">
        {data.response[0].country.name + ' Leagues'}
      </h2>
      <ul className="sm:grid grid-cols-2 ">
        {data.response.length > 0 &&
          data.response.map((item: any) => (
            <li>
              <Link to={`../comps/${item.league.id}`}>{item.league.name}</Link>
            </li>
          ))}
      </ul>
    </>
  );
}

export default CountryCompetitions;
