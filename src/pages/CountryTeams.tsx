import { useLoaderData } from 'react-router-dom';

function CountryTeams() {
  const data: any = useLoaderData();

  return (
    <>
      <h2></h2>
      <ul>
        {data.response.length > 0 &&
          data.response.map((item: any) => (
            <li key={item.team.id}>{item.team.name}</li>
          ))}
      </ul>
    </>
  );
}

export default CountryTeams;
