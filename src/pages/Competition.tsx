import { useLoaderData } from 'react-router-dom';

function Competition() {
  const { availableSeasons, currentSeasonStandings }: any = useLoaderData();

  console.log(availableSeasons, currentSeasonStandings);

  return (
    <div>
      <h1 className="text-3xl ">{availableSeasons.response[0].league.name}</h1>
      <img
        className="w-20"
        src={availableSeasons.response[0].league.logo}
      ></img>
      <nav>
        <ul>
          <li></li>
          <li></li>
          <li></li>
        </ul>
      </nav>
      <label>
        Season{' '}
        <select>
          {availableSeasons.response[0].seasons.map((season: any) => (
            <option key={season.year}>{season.year}</option>
          ))}
        </select>
      </label>
      <article>
        <ul>{/* Team standings for selected season */}</ul>
      </article>
    </div>
  );
}

export default Competition;
