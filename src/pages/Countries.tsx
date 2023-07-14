import { Link } from 'react-router-dom';
import useTeamsCountries from '../utils/useTeamsCountries.ts';

function Teams() {
  const countries = useTeamsCountries();

  let letter = '';

  return (
    <>
      <article className="p-5 ">
        <h2 className="text-3xl">Countries</h2>
        <div className="sm:grid grid-cols-2 ">
          {countries.length !== 0 &&
            countries.map((country: { name: string }) => {
              if (country.name[0] === letter) return null;
              else {
                letter = country.name[0];
                return (
                  <div className="py-5 text-xl">
                    <h3 key={letter} className="text-2xl">
                      {letter}
                    </h3>
                    <ul key={letter + letter}>
                      {countries
                        .filter((c: { name: string }) => c.name[0] === letter)
                        .map((item: { name: string }) => (
                          <li key={item.name}>
                            <Link to={`/${item.name}`}>{item.name}</Link>
                          </li>
                        ))}
                    </ul>
                  </div>
                );
              }
            })}
        </div>
      </article>
    </>
  );
}

export default Teams;