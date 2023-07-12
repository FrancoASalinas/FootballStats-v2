import { Link } from 'react-router-dom';
import useTeamsCountries from '../utils/useTeamsCountries.ts';

function Teams() {
  const countries: [] = useTeamsCountries();

  return (
    <>
      <article>
        <h2>Countries</h2>
        <ul>
          {countries.length !== 0 &&
            countries.map((country: any) => (
              <li key={country.name}>
                <Link to={`/${country.name}`}>{country.name}</Link>
              </li>
            ))}
        </ul>
      </article>
    </>
  );
}

export default Teams;
